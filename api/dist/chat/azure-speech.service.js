"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AzureSpeechService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureSpeechService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sdk = __importStar(require("microsoft-cognitiveservices-speech-sdk"));
const child_process_1 = require("child_process");
let AzureSpeechService = AzureSpeechService_1 = class AzureSpeechService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AzureSpeechService_1.name);
    }
    async convertToPcm(audioBuffer) {
        this.logger.log('Starting audio conversion to PCM...');
        return new Promise((resolve, reject) => {
            const ffmpeg = (0, child_process_1.spawn)('ffmpeg', [
                '-i', 'pipe:0',
                '-f', 's16le',
                '-ar', '16000',
                '-ac', '1',
                '-acodec', 'pcm_s16le',
                'pipe:1'
            ]);
            const chunks = [];
            ffmpeg.stdout.on('data', chunk => {
                this.logger.debug(`Received chunk: ${chunk.length} bytes`);
                chunks.push(chunk);
            });
            ffmpeg.stderr.on('data', chunk => {
                this.logger.debug(`ffmpeg: ${chunk.toString()}`);
            });
            ffmpeg.on('error', (err) => {
                this.logger.error('ffmpeg process error:', err);
                reject(err);
            });
            ffmpeg.on('close', code => {
                if (code !== 0) {
                    this.logger.error(`ffmpeg exited with code ${code}`);
                    return reject(new Error(`ffmpeg exited with code ${code}`));
                }
                const pcmBuffer = Buffer.concat(chunks);
                this.logger.log(`✓ Converted audio to PCM: ${pcmBuffer.length} bytes`);
                resolve(pcmBuffer);
            });
            this.logger.log(`Writing ${audioBuffer.length} bytes to ffmpeg...`);
            ffmpeg.stdin.write(audioBuffer);
            ffmpeg.stdin.end();
        });
    }
    async transcribeAudio(audioBuffer) {
        try {
            const speechKey = this.configService.get('AZURE_SPEECH_KEY');
            const speechRegion = this.configService.get('AZURE_SPEECH_REGION');
            if (!speechKey || !speechRegion) {
                throw new Error('Azure Speech configuration is missing!');
            }
            this.logger.log(`Original audio buffer size: ${audioBuffer.length} bytes`);
            const pcmBuffer = await this.convertToPcm(audioBuffer);
            if (pcmBuffer.length === 0) {
                this.logger.error('PCM conversion resulted in empty buffer!');
                return '';
            }
            const audioFormat = sdk.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);
            const pushStream = sdk.AudioInputStream.createPushStream(audioFormat);
            const arrayBuffer = new ArrayBuffer(pcmBuffer.length);
            const view = new Uint8Array(arrayBuffer);
            pcmBuffer.copy(view);
            this.logger.log(`Writing ${arrayBuffer.byteLength} bytes to Azure stream...`);
            pushStream.write(arrayBuffer);
            pushStream.close();
            const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
            const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
            speechConfig.speechRecognitionLanguage = 'de-DE';
            const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
            return new Promise((resolve, reject) => {
                recognizer.recognizeOnceAsync(result => {
                    this.logger.log(`Recognition result reason: ${sdk.ResultReason[result.reason]}`);
                    recognizer.close();
                    if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                        this.logger.log(`✓ Recognized text: ${result.text}`);
                        resolve(result.text);
                    }
                    else if (result.reason === sdk.ResultReason.NoMatch) {
                        this.logger.warn('No speech could be recognized');
                        const noMatchDetail = sdk.NoMatchDetails.fromResult(result);
                        this.logger.warn(`NoMatch reason: ${sdk.NoMatchReason[noMatchDetail.reason]}`);
                        resolve('');
                    }
                    else if (result.reason === sdk.ResultReason.Canceled) {
                        const cancellation = sdk.CancellationDetails.fromResult(result);
                        this.logger.error(`Recognition canceled: ${cancellation.reason}`);
                        this.logger.error(`Error code: ${cancellation.ErrorCode}`);
                        this.logger.error(`Error details: ${cancellation.errorDetails}`);
                        reject(new Error(`Recognition canceled: ${cancellation.errorDetails}`));
                    }
                    else {
                        this.logger.warn(`Unexpected result reason: ${sdk.ResultReason[result.reason]}`);
                        resolve('');
                    }
                }, err => {
                    recognizer.close();
                    this.logger.error('Azure Speech recognition error:', err);
                    reject(err);
                });
            });
        }
        catch (err) {
            this.logger.error('transcribeAudio threw exception:', err);
            throw err;
        }
    }
};
exports.AzureSpeechService = AzureSpeechService;
exports.AzureSpeechService = AzureSpeechService = AzureSpeechService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AzureSpeechService);
//# sourceMappingURL=azure-speech.service.js.map
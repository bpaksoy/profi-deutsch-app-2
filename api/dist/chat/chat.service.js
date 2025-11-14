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
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sdk = __importStar(require("microsoft-cognitiveservices-speech-sdk"));
const stream_1 = require("stream");
let ChatService = ChatService_1 = class ChatService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ChatService_1.name);
        this.DEFAULT_TTS_VOICE = "de-DE-KatjaNeural";
        const key = this.configService.get('AZURE_SPEECH_KEY');
        const region = this.configService.get('AZURE_SPEECH_REGION');
        if (!key || !region) {
            throw new common_1.InternalServerErrorException('Azure Speech Key or Region not configured.');
        }
        this.SPEECH_CONFIG = sdk.SpeechConfig.fromSubscription(key, region);
        this.SPEECH_CONFIG.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3;
    }
    async generateSpeechStream(text) {
        return new Promise((resolve, reject) => {
            const synthesizer = new sdk.SpeechSynthesizer(this.SPEECH_CONFIG, undefined);
            synthesizer.speakTextAsync(text, result => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    const audioData = Buffer.from(result.audioData);
                    resolve(stream_1.Readable.from(audioData));
                }
                else {
                    reject(new Error(`Speech synthesis failed: ${result.errorDetails}`));
                }
                synthesizer.close();
            });
        });
    }
    async transcribeAudio(audioBuffer) {
        this.logger.warn('STT function needs full implementation.');
        return 'Transcribed text from user audio.';
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
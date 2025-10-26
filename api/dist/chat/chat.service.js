"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const elevenlabs_js_1 = require("@elevenlabs/elevenlabs-js");
const stream_1 = require("stream");
let ChatService = ChatService_1 = class ChatService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ChatService_1.name);
        this.DEFAULT_VOICE_ID = 'YOUR_GERMAN_VOICE_ID';
        const apiKey = this.configService.get('ELEVENLABS_API_KEY');
        if (!apiKey) {
            throw new common_1.InternalServerErrorException('ELEVENLABS_API_KEY is not configured.');
        }
        this.elevenlabs = new elevenlabs_js_1.ElevenLabsClient({ apiKey });
    }
    async generateSpeechStream(text) {
        try {
            this.logger.log(`Generating speech for text: "${text.substring(0, 30)}…"`);
            const response = await this.elevenlabs.textToSpeech.convert(this.DEFAULT_VOICE_ID, {
                text,
                modelId: 'eleven_multilingual_v2',
                outputFormat: 'mp3_44100_128',
            });
            return stream_1.Readable.from(response);
        }
        catch (error) {
            this.logger.error('ElevenLabs API Error:', error.message);
            throw new Error('Failed to generate speech audio stream.');
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
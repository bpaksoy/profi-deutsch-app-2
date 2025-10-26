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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
let ChatController = ChatController_1 = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
        this.logger = new common_1.Logger(ChatController_1.name);
    }
    async getTtsStream(text, res) {
        if (!text) {
            throw new common_1.InternalServerErrorException('Text parameter is required.');
        }
        try {
            this.logger.log('Receiving TTS request, sending to service...');
            const audioStream = await this.chatService.generateSpeechStream(text);
            audioStream.pipe(res);
        }
        catch (error) {
            this.logger.error('Streaming Error:', error.message);
            if (!res.headersSent) {
                res.status(500).send('Audio stream failed.');
            }
        }
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('tts'),
    (0, common_1.Header)('Content-Type', 'audio/mpeg'),
    (0, common_1.Header)('Cache-Control', 'no-cache'),
    __param(0, (0, common_1.Query)('text')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getTtsStream", null);
exports.ChatController = ChatController = ChatController_1 = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map
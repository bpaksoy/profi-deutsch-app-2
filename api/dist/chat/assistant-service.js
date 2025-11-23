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
var AssistantService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AssistantService = AssistantService_1 = class AssistantService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AssistantService_1.name);
    }
    async getGeminiResponse(userInput) {
        const apiKey = this.configService.get('GEMINI_API_KEY');
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const systemPrompt = `Du bist ein freundlicher, motivierender virtueller Assistent für Deutschlerner. 
Antworte immer sehr kurz, präzise und ermutigend (maximal 1-2 Sätze).`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                contents: [{
                        parts: [{ text: `${systemPrompt}\n\nBenutzer: ${userInput}` }]
                    }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 100,
                },
            })
        });
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return text ? text.trim() : 'Entschuldigung, ich bin gerade nicht verfügbar.';
    }
};
exports.AssistantService = AssistantService;
exports.AssistantService = AssistantService = AssistantService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AssistantService);
//# sourceMappingURL=assistant-service.js.map
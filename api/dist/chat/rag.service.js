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
var RAGService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAGService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let RAGService = RAGService_1 = class RAGService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RAGService_1.name);
        this.conversationHistories = new Map();
    }
    async generateResponseJson(userInput, sessionId) {
        this.logger.log(`RAG Service received input: ${userInput}`);
        if (!userInput || userInput.trim() === '') {
            return {
                transcript: userInput,
                responseText: "Entschuldigung, ich habe nichts verstanden."
            };
        }
        try {
            const session = sessionId || 'default-session';
            const aiResponse = await this.callGemini(userInput, session);
            return {
                transcript: userInput,
                responseText: aiResponse
            };
        }
        catch (error) {
            this.logger.error('Error calling Gemini:', error);
            return {
                transcript: userInput,
                responseText: "Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Anfrage."
            };
        }
    }
    clearConversation(sessionId) {
        this.conversationHistories.delete(sessionId);
        this.logger.log(`Cleared conversation history for session: ${sessionId}`);
    }
    async callGemini(userInput, sessionId) {
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error('Google Gemini API key is missing');
        }
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        if (!this.conversationHistories.has(sessionId)) {
            this.conversationHistories.set(sessionId, []);
            this.logger.log(`Started new conversation for session: ${sessionId}`);
        }
        const history = this.conversationHistories.get(sessionId);
        history.push({
            role: 'user',
            parts: [{ text: userInput }]
        });
        const systemPrompt = `# Persönlichkeit

Du bist ein geduldiger und freundlicher Sprachlernbegleiter namens Flo. Sprich wie ein Freund.
Du bist ein deutscher Muttersprachler mit perfekter Aussprache und spezialisierst dich darauf, Lernenden zu helfen, das B2-Niveau in Deutsch gemäß dem GER (Gemeinsamer Europäischer Referenzrahmen für Sprachen) zu erreichen. Du bist unterstützend und ermutigend, sprichst ruhig und langsam. Du bietest Korrekturen und Erklärungen auf klare und verständliche Weise an.

# Umgebung

Du führst ein gesprochenes Gespräch mit einem Sprachlernenden, der sein Deutsch übt.
Der Lernende möchte seine deutschen Sprechfähigkeiten auf das B2-Niveau verbessern.
Das Gespräch findet in einer virtuellen Umgebung statt und simuliert ein natürliches Gesprächssetting.
Dies ist ein FORTLAUFENDES Gespräch. Reagiere natürlich auf das, was der Benutzer gerade gesagt hat und erinnere dich an vorherige Nachrichten.

# Tonfall

Deine Antworten sind freundlich, klar und ermutigend.
Du sprichst in einem natürlichen und gesprächigen Ton und gibst Korrekturen und Vorschläge auf unterstützende Weise.
Du verwendest einfache und leicht verständliche Sprache und vermeidest übermäßig komplexe Grammatikerklärungen.
Sage niemals mehr als zwei bis drei Sätze, es sei denn, du wirst gebeten, eine lange Erklärung zu geben.
Du bist geduldig und verständnisvoll und gibst dem Lernenden Zeit, seine Gedanken zu formulieren.

# WICHTIG: Natürliche Gesprächsführung

- Reagiere direkt auf das, was der Benutzer gerade gesagt hat
- ERINNERE DICH an vorherige Nachrichten im Gespräch
- Bestätige und erweitere das Thema natürlich
- Stelle nicht nur Fragen, sondern teile auch eigene Gedanken oder gib Feedback
- Wenn jemand etwas über sich erzählt, zeige Interesse und baue darauf auf

Beispiele für gute Reaktionen:
Benutzer: "Ich gehe immer ins Kino."
Gut: "Oh, das ist toll! Welche Art von Filmen magst du am liebsten?"
Dann später:
Benutzer: "Ich mag Action-Filme."
Gut: "Action-Filme sind spannend! Hast du einen Lieblingsfilm?"

# WICHTIG: Gesprächsfluss

- Sage "Hallo" und stelle dich NUR vor, wenn es die allererste Nachricht ist
- Bei allen anderen Nachrichten: Reagiere direkt auf den Inhalt
- KEINE Wiederholungen von Begrüßungen mitten im Gespräch
- Beziehe dich auf frühere Teile des Gesprächs, wenn relevant

# WICHTIGE REGEL

Der Benutzer kann auf Deutsch ODER Englisch sprechen.
Du MUSST IMMER auf Deutsch antworten, NIEMALS auf Englisch.
AUSNAHME: Wenn du eine deutsche Phrase ins Englische übersetzen sollst, darfst du die englische Übersetzung in Anführungszeichen nennen.

# Formatierung

- Verwende KEINE Sternchen, Markdown oder spezielle Formatierung
- Sprich natürlich wie in einem echten Gespräch
- Sei direkt und hilfreich
- KEINE wiederholten Begrüßungen oder Vorstellungen`;
        this.logger.log('Calling Gemini API with conversation history...');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: history,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 400,
                    topP: 0.8,
                    topK: 40
                },
                systemInstruction: {
                    parts: [
                        {
                            text: systemPrompt
                        }
                    ]
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_ONLY_HIGH"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_ONLY_HIGH"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_ONLY_HIGH"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_ONLY_HIGH"
                    }
                ]
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            this.logger.error('Gemini API error:', errorText);
            throw new Error(`Gemini API request failed: ${response.status}`);
        }
        const data = await response.json();
        this.logger.log('Gemini response received');
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            this.logger.warn('No text in Gemini response:', JSON.stringify(data));
            return 'Entschuldigung, ich konnte keine Antwort generieren.';
        }
        history.push({
            role: 'model',
            parts: [{ text: text }]
        });
        if (history.length > 20) {
            history.splice(0, 2);
            this.logger.log('Trimmed conversation history');
        }
        text = text
            .replace(/\*\*\*/g, '')
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/#{1,6}\s/g, '')
            .replace(/`{1,3}/g, '')
            .replace(/^Hallo!\s*/gi, '')
            .replace(/^Na klar!\s*/gi, '')
            .replace(/Hallo! Schön, dass du da bist\..+?verbessern\.\s*/gi, '')
            .replace(/Ich bin Flo und helfe dir.+?anfangen\?\s*/gi, '')
            .replace(/^\s+|\s+$/g, '')
            .replace(/\n{3,}/g, '\n\n');
        this.logger.log(`Generated response: ${text.substring(0, 50)}...`);
        return text.trim();
    }
    async testGeminiConnection() {
        const apiKey = this.configService.get('GEMINI_API_KEY');
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        this.logger.log('Available Gemini models:');
        data.models?.forEach((model) => {
            this.logger.log(`- ${model.name}`);
        });
    }
};
exports.RAGService = RAGService;
exports.RAGService = RAGService = RAGService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RAGService);
//# sourceMappingURL=rag.service.js.map
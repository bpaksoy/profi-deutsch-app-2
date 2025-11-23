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
    }
    async generateResponseJson(userInput) {
        this.logger.log(`RAG Service received input: ${userInput}`);
        if (!userInput || userInput.trim() === '') {
            return {
                transcript: userInput,
                responseText: "Entschuldigung, ich habe nichts verstanden."
            };
        }
        try {
            const aiResponse = await this.callGemini(userInput);
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
    async callGemini(userInput) {
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error('Google Gemini API key is missing');
        }
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const systemPrompt = `# Persönlichkeit

Du bist ein geduldiger und freundlicher Sprachlernbegleiter namens Flo. Sprich wie ein Freund.
Du bist ein deutscher Muttersprachler mit perfekter Aussprache und spezialisierst dich darauf, Lernenden zu helfen, das B2-Niveau in Deutsch gemäß dem GER (Gemeinsamer Europäischer Referenzrahmen für Sprachen) zu erreichen. Du bist unterstützend und ermutigend, sprichst ruhig und langsam. Du bietest Korrekturen und Erklärungen auf klare und verständliche Weise an.

# Umgebung

Du führst ein gesprochenes Gespräch mit einem Sprachlernenden, der sein Deutsch übt.
Der Lernende möchte seine deutschen Sprechfähigkeiten auf das B2-Niveau verbessern.
Das Gespräch findet in einer virtuellen Umgebung statt und simuliert ein natürliches Gesprächssetting.

# Tonfall

Deine Antworten sind freundlich, klar und ermutigend.
Du sprichst in einem natürlichen und gesprächigen Ton und gibst Korrekturen und Vorschläge auf unterstützende Weise.
Du verwendest einfache und leicht verständliche Sprache und vermeidest übermäßig komplexe Grammatikerklärungen.
Sage niemals mehr als zwei bis drei Sätze, es sei denn, du wirst gebeten, eine lange Erklärung zu geben.
Du bist geduldig und verständnisvoll und gibst dem Lernenden Zeit, seine Gedanken zu formulieren.

# WICHTIG: Gesprächsfluss

- Sage "Hallo" nur beim allerersten Mal oder wenn der Benutzer dich explizit grüßt
- Antworte natürlich und direkt auf die Frage ohne unnötige Begrüßungen
- Beginne deine Antworten mit dem Inhalt, nicht mit Floskeln wie "Hallo!", "Na klar!", usw.
- Sprich wie in einem fortlaufenden Gespräch, nicht wie am Anfang jeder Nachricht

Beispiele:
Schlecht: "Hallo! Das ist eine gute Frage..."
Gut: "Das kannst du so sagen: Ich freue mich, hier zu sein."

Schlecht: "Na klar! Lass uns das lernen..."
Gut: "Gerne! Die wichtigsten Begrüßungen sind..."

# WICHTIG: Umgang mit Spracherkennungsfehlern

Die Eingabe des Benutzers kommt von Spracherkennung und kann Fehler enthalten.
Interpretiere die Bedeutung intelligent, auch wenn Wörter falsch erkannt wurden.
Beispiele:
- "great things" oder "greatings" → wahrscheinlich "greetings" (Begrüßungen)
- "basic phrases" → grundlegende Ausdrücke
- "how do I say" → Wie sage ich
Wenn du dir unsicher bist, frage kurz nach, aber sei hilfreich und nicht pedantisch.

# Ziel

Dein Hauptziel ist es, dem Lernenden zu helfen, seine deutschen Sprechfähigkeiten zu üben und zu verbessern durch:

1. **Gespräche führen:** Gespräche zu verschiedenen Themen initiieren und aufrechterhalten.
2. **Korrekturen geben:** Grammatikfehler identifizieren und korrigieren, aber freundlich.
3. **Direktes Unterrichten:** Wenn jemand nach Vokabeln, Phrasen oder Grammatik fragt, gib sofort 3-4 konkrete Beispiele.
4. **Übungsthemen vorschlagen:** Eine Vielzahl von Themen anbieten, die für das B1- und B2-Niveau relevant sind.

# WICHTIGE REGEL

Der Benutzer kann auf Deutsch ODER Englisch sprechen.
Du MUSST IMMER auf Deutsch antworten, NIEMALS auf Englisch.
Wenn der Benutzer auf Englisch spricht, verstehe die Bedeutung und antworte auf DEUTSCH.

Wenn jemand nach "basic greetings", "Begrüßungen", "how to say hello" oder ähnlichem fragt:
Gib SOFORT 3-4 konkrete Beispiele, zum Beispiel:
"Gerne! Hier sind die wichtigsten Begrüßungen: Guten Morgen, Guten Tag, Guten Abend, und natürlich Hallo für informelle Situationen."

# Formatierung

- Verwende KEINE Sternchen, Markdown oder spezielle Formatierung
- Sprich natürlich wie in einem echten Gespräch
- Sei direkt und hilfreich - gib konkrete Beispiele statt nur zu fragen`;
        this.logger.log('Calling Gemini API...');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${systemPrompt}\n\nBenutzer: ${userInput}\n\nAssistent:`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 400,
                    topP: 0.8,
                    topK: 40
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
        this.testGeminiConnection();
        text = text
            .replace(/\*\*\*/g, '')
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/#{1,6}\s/g, '')
            .replace(/`{1,3}/g, '')
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
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureSpeechService } from './azure-speech.service'; 

@Injectable()
export class AssistantService {
    private readonly logger = new Logger(AssistantService.name);

    constructor(private readonly configService: ConfigService) {}

    async getGeminiResponse(userInput: string): Promise<string> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const systemPrompt = `Du bist ein freundlicher, motivierender virtueller Assistent für Deutschlerner.
Du VERSTEHST alle Sprachen (Englisch, Türkisch, Spanisch, etc.), aber du antwortest AUSSCHLIESSLICH auf Deutsch. Niemals auf Englisch.
Wenn der Benutzer auf Englisch schreibt, zeige dass du ihn verstanden hast und antworte auf Deutsch.
Antworte immer sehr kurz, präzise und ermutigend (maximal 1-2 Sätze). Keine Markdown-Formatierung.`;

        const response = await fetch(url, {
            method: 'POST',
            // ... (rest of the fetch logic for the API call) ...
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemPrompt}\n\nBenutzer: ${userInput}` }]
                }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 100,
                },
                // ... safety settings ...
            })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        return text ? text.trim() : 'Entschuldigung, ich bin gerade nicht verfügbar.';
    }
 
}
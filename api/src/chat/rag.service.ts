import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RAGService {
    private readonly logger = new Logger(RAGService.name);

    constructor(private readonly configService: ConfigService) {}

    async generateResponseJson(userInput: string): Promise<any> {
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
        } catch (error) {
            this.logger.error('Error calling Gemini:', error);
            return {
                transcript: userInput,
                responseText: "Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Anfrage."
            };
        }
    }

    private async callGemini(userInput: string): Promise<string> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');

        if (!apiKey) {
            throw new Error('Google Gemini API key is missing');
        }

        // ✅ Use v1beta with the full model name
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const systemPrompt = `Du bist ein hilfreicher deutscher KI-Assistent für Sprachübungen. 
Antworte immer auf Deutsch in einem freundlichen und natürlichen Ton.
Halte deine Antworten präzise und conversational (2-3 Sätze).
Wenn der Benutzer Deutsch lernt, korrigiere Fehler sanft und ermutigend.`;

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
                    maxOutputTokens: 300,
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
        
        // Extract text from Gemini's response structure
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) {
            this.logger.warn('No text in Gemini response:', JSON.stringify(data));
            return 'Entschuldigung, ich konnte keine Antwort generieren.';
        }

        this.testGeminiConnection();

        this.logger.log(`Generated response: ${text.substring(0, 50)}...`);
        return text.trim();
    }


    async testGeminiConnection(): Promise<void> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        this.logger.log('Available Gemini models:');
        data.models?.forEach((model: any) => {
            this.logger.log(`- ${model.name}`);
        });
    }
}


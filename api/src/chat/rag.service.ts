import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

interface ConversationMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

@Injectable()
export class RAGService {
    private readonly logger = new Logger(RAGService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService  // ✅ Inject Prisma
    ) {}

    async generateResponseJson(userInput: string, sessionId?: string): Promise<any> {
        this.logger.log(`RAG Service received input: ${userInput}`);

        if (!userInput || userInput.trim() === '') {
            return {
                transcript: userInput,
                responseText: "Entschuldigung, ich habe nichts verstanden."
            };
        }

        try {
            const session = sessionId || 'default-session';
            
            // ✅ Get or create conversation
            let conversation = await this.prisma.conversation.findUnique({
                where: { sessionId: session },
                include: {
                    messages: {
                        orderBy: { timestamp: 'asc' },
                        take: 20  // Last 20 messages for context
                    }
                }
            });

            if (!conversation) {
                conversation = await this.prisma.conversation.create({
                    data: {
                        sessionId: session,
                        topic: 'General conversation'
                    },
                    include: { messages: true }
                });
                this.logger.log(`Created new conversation: ${session}`);
            }

            // ✅ Save user message to database
            await this.prisma.message.create({
                data: {
                    conversationId: conversation.id,
                    role: 'user',
                    content: userInput,
                    transcription: userInput
                }
            });

            // ✅ Get AI response with conversation history from DB
            const aiResponse = await this.callGemini(userInput, conversation.messages);

            // ✅ Save AI response to database
            await this.prisma.message.create({
                data: {
                    conversationId: conversation.id,
                    role: 'assistant',
                    content: aiResponse
                }
            });
            
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

    async clearConversation(sessionId: string): Promise<void> {
        const conversation = await this.prisma.conversation.findUnique({
            where: { sessionId }
        });

        if (conversation) {
            await this.prisma.conversation.delete({
                where: { id: conversation.id }
            });
            this.logger.log(`Cleared conversation: ${sessionId}`);
        }
    }

    private async callGemini(userInput: string, dbMessages: any[]): Promise<string> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');

        if (!apiKey) {
            throw new Error('Google Gemini API key is missing');
        }

       const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        // ✅ Convert DB messages to Gemini format
        const history: ConversationMessage[] = dbMessages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        // ✅ Add current user message
        history.push({
            role: 'user',
            parts: [{ text: userInput }]
        });

        // ✅ Retrieve relevant knowledge from database
        const knowledgeContext = await this.getRelevantKnowledge(userInput);

        const systemPrompt = `# Persönlichkeit

Du bist ein geduldiger und freundlicher Sprachlernbegleiter namens Flo. Sprich wie ein Freund.
Du bist ein deutscher Muttersprachler mit perfekter Aussprache und spezialisierst dich darauf, Lernenden zu helfen, das B2-Niveau in Deutsch gemäß dem GER (Gemeinsamer Europäischer Referenzrahmen für Sprachen) zu erreichen.

# Wissensbasis

${knowledgeContext ? `Hier ist relevantes Wissen für das Gespräch:\n${knowledgeContext}\n\n` : ''}

# Umgebung

Du führst ein gesprochenes Gespräch mit einem Sprachlernenden.
Dies ist ein FORTLAUFENDES Gespräch. Du hast Zugriff auf die gesamte Gesprächshistorie.
Reagiere natürlich auf das, was der Benutzer gerade gesagt hat und erinnere dich an vorherige Nachrichten.

# WICHTIGE REGEL

Der Benutzer kann auf Deutsch ODER Englisch sprechen.
Du MUSST IMMER auf Deutsch antworten, NIEMALS auf Englisch.

# Formatierung

- Verwende KEINE Sternchen, Markdown oder spezielle Formatierung
- Sprich natürlich wie in einem echten Gespräch
- Sage niemals mehr als zwei bis drei Sätze
- KEINE wiederholten Begrüßungen`;

        this.logger.log('Calling Gemini API with database conversation history...');

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
                    parts: [{ text: systemPrompt }]
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
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) {
            this.logger.warn('No text in Gemini response');
            return 'Entschuldigung, ich konnte keine Antwort generieren.';
        }

        // Clean up response
        text = text
            .replace(/\*\*\*/g, '')
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/#{1,6}\s/g, '')
            .replace(/`{1,3}/g, '')
            .replace(/^Hallo!\s*/gi, '')
            .replace(/^Na klar!\s*/gi, '')
            .trim();

        return text;
    }

    // ✅ Retrieve relevant knowledge from database
    private async getRelevantKnowledge(query: string): Promise<string> {
        // Simple keyword search for now (can upgrade to semantic search later)
        const keywords = query.toLowerCase().split(' ').filter(w => w.length > 3);
        
        if (keywords.length === 0) return '';

        const documents = await this.prisma.knowledgeDocument.findMany({
            where: {
                OR: keywords.map(keyword => ({
                    content: {
                        contains: keyword
                    }
                }))
            },
            take: 3
        });

        if (documents.length === 0) return '';

        return documents
            .map(doc => `${doc.title}:\n${doc.content.substring(0, 500)}`)
            .join('\n\n');
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


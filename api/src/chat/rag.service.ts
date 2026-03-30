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
    ) { }

    async generateResponseJson(userInput: string, conversationId?: string): Promise<any> {
        this.logger.log(`RAG Service received input: ${userInput}`);

        if (!userInput || userInput.trim() === '') {
            return {
                transcript: userInput,
                responseText: "Entschuldigung, ich habe nichts verstanden."
            };
        }

        try {
            // ✅ Get conversation history from DB to pass to Gemini
            let conversationHistory: any[] = [];

            if (conversationId) {
                const conversation = await this.prisma.conversation.findUnique({
                    where: { id: conversationId },
                    include: {
                        messages: {
                            orderBy: { timestamp: 'asc' },
                            take: 10  // Last 10 messages for context
                        }
                    }
                });

                if (conversation) {
                    conversationHistory = conversation.messages;
                }
            }

            // ✅ Get AI response with conversation history from DB
            const aiResponse = await this.callGemini(userInput, conversationHistory);

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

    async clearConversation(id: string): Promise<void> {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id }
        });

        if (conversation) {
            await this.prisma.conversation.delete({
                where: { id: conversation.id }
            });
            this.logger.log(`Cleared conversation: ${id}`);
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

        const today = new Date().toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const systemPrompt = `# Persönlichkeit
Du bist Flo, ein freundlicher, geduldiger und motivierender Sprachlernpartner für Deutsch.
Dein Ziel ist es, dem Benutzer zu helfen, selbstbewusst Deutsch zu sprechen und das B2-Niveau zu erreichen.
Du korrigierst Fehler sanft, aber nicht pedantisch. Wenn der Benutzer einen Fehler macht, wiederhole den Satz oft in der korrekten Form in deiner Antwort, ohne explizit zu sagen "Das war falsch".

# Kontext
- Heute ist: ${today}

# Verhalten
- Sei interessiert an dem, was der Benutzer sagt. Stelle Rückfragen.
- Halte deine Antworten kurz und prägnant (max. 2-3 Sätze), damit der Benutzer mehr Sprechzeit hat.
- Passe dein Sprachniveau an den Benutzer an (B1/B2).
- Sei humorvoll und locker, wie ein guter Freund.

# WICHTIGE REGELN
1.  Antworte AUSSCHLIESSLICH auf Deutsch. Niemals auf Englisch oder einer anderen Sprache. Das ist die wichtigste Regel.
2.  Du VERSTEHST alle Sprachen (Englisch, Türkisch, Spanisch, etc.), aber du antwortest NUR auf Deutsch.
3.  Wenn der Benutzer auf Englisch schreibt, zeige dass du ihn verstanden hast, antworte aber auf Deutsch. Zum Beispiel: Wenn der User sagt "I want to go to the cinema", antworte: "Ah, du möchtest ins Kino gehen! Welchen Film möchtest du sehen?"
4.  Verwende KEINE Markdown-Formatierung (keine Sternchen, kein Fettgedrucktes), da deine Antwort vorgelesen wird.
5.  Vermeide lange Monologe.
6.  Beende IMMER deine Sätze vollständig. Brich niemals mitten im Satz ab.`;

        this.logger.log(`Calling Gemini API (gemini-1.5-flash) with ${history.length} messages...`);

        let attempt = 0;
        const maxRetries = 3;

        while (attempt < maxRetries) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for retries

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: history,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 500,
                            topP: 0.8,
                            topK: 40
                        },
                        systemInstruction: {
                            parts: [{ text: systemPrompt }]
                        },
                        safetySettings: [
                            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
                            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
                            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
                            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
                        ]
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (response.status === 429) {
                    attempt++;
                    if (attempt >= maxRetries) {
                        const errorText = await response.text();
                        this.logger.error('Gemini API 429 error (Max Retries Reached):', errorText);
                        throw new Error(`Gemini API request failed: ${response.status} - Quota Exceeded`);
                    }

                    // Default backoff 2s, 4s, 8s, unless Retry-After header is present
                    let delay = 2000 * Math.pow(2, attempt);
                    const retryAfter = response.headers.get('Retry-After');
                    if (retryAfter) {
                        delay = parseInt(retryAfter, 10) * 1000;
                    }

                    this.logger.warn(`Gemini API 429 Too Many Requests. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
                    await new Promise(res => setTimeout(res, delay));
                    continue;
                }

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

            } catch (error) {
                clearTimeout(timeoutId);
                // If it's the last attempt or not a retry-able error (like abort), throw
                if (attempt >= maxRetries - 1 || error.name === 'AbortError') {
                    throw error;
                }
                attempt++;
                this.logger.error(`Error calling Gemini (Attempt ${attempt}):`, error);
                await new Promise(res => setTimeout(res, 1000)); // Generic wait for network errors
            }
        }
        throw new Error('Gemini API failed after max retries');
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

    async *streamResponse(userInput: string, conversationId?: string): AsyncGenerator<string> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) throw new Error('Google Gemini API key is missing');

        let conversationHistory: any[] = [];
        if (conversationId) {
            const conversation = await this.prisma.conversation.findUnique({
                where: { id: conversationId },
                include: { messages: { orderBy: { timestamp: 'asc' }, take: 10 } }
            });
            if (conversation) conversationHistory = conversation.messages;
        }

        const history = conversationHistory.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));
        history.push({ role: 'user', parts: [{ text: userInput }] });

        const today = new Date().toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const systemPrompt = `# Persönlichkeit
Du bist Flo, ein freundlicher, geduldiger und motivierender Sprachlernpartner für Deutsch.
Dein Ziel ist es, dem Benutzer zu helfen, selbstbewusst Deutsch zu sprechen und das B2-Niveau zu erreichen.
Du korrigierst Fehler sanft, aber nicht pedantisch. Wenn der Benutzer einen Fehler macht, wiederhole den Satz oft in der korrekten Form in deiner Antwort, ohne explizit zu sagen "Das war falsch".

# Kontext
- Heute ist: ${today}

# Verhalten
- Sei interessiert an dem, was der Benutzer sagt. Stelle Rückfragen.
- Halte deine Antworten kurz und prägnant (max. 2-3 Sätze), damit der Benutzer mehr Sprechzeit hat.
- Passe dein Sprachniveau an den Benutzer an (B1/B2).
- Sei humorvoll und locker, wie ein guter Freund.

# WICHTIGE REGELN
1.  Antworte AUSSCHLIESSLICH auf Deutsch. Niemals auf Englisch oder einer anderen Sprache. Das ist die wichtigste Regel.
2.  Du VERSTEHST alle Sprachen (Englisch, Türkisch, Spanisch, etc.), aber du antwortest NUR auf Deutsch.
3.  Wenn der Benutzer auf Englisch schreibt, zeige dass du ihn verstanden hast, antworte aber auf Deutsch. Zum Beispiel: Wenn der User sagt "I want to go to the cinema", antworte: "Ah, du möchtest ins Kino gehen! Welchen Film möchtest du sehen?"
4.  Verwende KEINE Markdown-Formatierung (keine Sternchen, kein Fettgedrucktes), da deine Antwort vorgelesen wird.
5.  Vermeide lange Monologe.
6.  Beende IMMER deine Sätze vollständig. Brich niemals mitten im Satz ab.`;

        const requestBody = JSON.stringify({
            contents: history,
            generationConfig: { temperature: 0.7, maxOutputTokens: 500, topP: 0.8, topK: 40 },
            systemInstruction: { parts: [{ text: systemPrompt }] },
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
            ]
        });

        const models = ['gemini-2.5-flash', 'gemini-2.0-flash-lite'];
        let response: globalThis.Response | null = null;

        for (const model of models) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
            
            for (let attempt = 0; attempt < 2; attempt++) {
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: requestBody
                });

                if (response.ok) break;

                if (response.status === 429) {
                    this.logger.warn(`${model} rate limited (attempt ${attempt + 1}), waiting...`);
                    await new Promise(r => setTimeout(r, 3000));
                    response = null;
                    continue;
                }

                const errorText = await response.text();
                this.logger.error(`${model} streaming error:`, errorText);
                response = null;
                break;
            }

            if (response?.ok) {
                this.logger.log(`Using model: ${model}`);
                break;
            }
        }

        if (!response?.ok) {
            throw new Error('All Gemini models failed');
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.slice(6).trim();
                    if (!jsonStr || jsonStr === '[DONE]') continue;
                    try {
                        const data = JSON.parse(jsonStr);
                        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (text) yield text;
                    } catch {
                        // skip malformed JSON
                    }
                }
            }
        }
    }


}


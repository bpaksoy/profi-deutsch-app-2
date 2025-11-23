import { ConfigService } from '@nestjs/config';
export declare class RAGService {
    private readonly configService;
    private readonly logger;
    private conversationHistories;
    constructor(configService: ConfigService);
    generateResponseJson(userInput: string, sessionId?: string): Promise<any>;
    clearConversation(sessionId: string): void;
    private callGemini;
    testGeminiConnection(): Promise<void>;
}

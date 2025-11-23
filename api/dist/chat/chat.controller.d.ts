import { Response } from 'express';
import { ChatService } from './chat.service';
import { RAGService } from './rag.service';
import { AzureSpeechService } from './azure-speech.service';
import { AssistantService } from './assistant-service';
export declare class ChatController {
    private readonly chatService;
    private readonly ragService;
    private readonly azureSpeechService;
    private readonly assistantService;
    private readonly logger;
    constructor(chatService: ChatService, ragService: RAGService, azureSpeechService: AzureSpeechService, assistantService: AssistantService);
    getTtsStream(text: string, res: Response): Promise<void>;
    transcribeAndProcess(file: Express.Multer.File, body: any, session: Record<string, any>): Promise<{
        transcript: string;
        responseText: any;
        audioBase64: string;
    }>;
    resetConversation(session: Record<string, any>): Promise<{
        success: boolean;
    }>;
    testGemini(): Promise<{
        status: string;
    }>;
}

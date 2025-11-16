import { Response } from 'express';
import { ChatService } from './chat.service';
import { RAGService } from './rag.service';
import { AzureSpeechService } from './azure-speech.service';
export declare class ChatController {
    private readonly chatService;
    private readonly ragService;
    private readonly azureSpeechService;
    private readonly logger;
    constructor(chatService: ChatService, ragService: RAGService, azureSpeechService: AzureSpeechService);
    getTtsStream(text: string, res: Response): Promise<void>;
    transcribeAndProcess(file: Express.Multer.File, body: any): Promise<{
        transcript: string;
        responseText: any;
        audioBase64: string;
    }>;
    testGemini(): Promise<{
        status: string;
    }>;
}

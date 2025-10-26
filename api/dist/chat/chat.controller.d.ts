import { Response } from 'express';
import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    private readonly logger;
    constructor(chatService: ChatService);
    getTtsStream(text: string, res: Response): Promise<void>;
}

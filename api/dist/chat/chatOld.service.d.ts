import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
export declare class ChatService {
    private configService;
    private readonly logger;
    private elevenlabs;
    private readonly DEFAULT_VOICE_ID;
    constructor(configService: ConfigService);
    generateSpeechStream(text: string): Promise<Readable>;
}

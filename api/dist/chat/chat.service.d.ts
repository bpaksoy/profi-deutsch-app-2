import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
export declare class ChatService {
    private configService;
    private readonly logger;
    private readonly SPEECH_CONFIG;
    private readonly DEFAULT_TTS_VOICE;
    constructor(configService: ConfigService);
    generateSpeechStream(text: string): Promise<Readable>;
    transcribeAudio(audioBuffer: Buffer): Promise<string>;
}

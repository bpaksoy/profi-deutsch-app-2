import { ConfigService } from '@nestjs/config';
export declare class AzureSpeechService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    private convertToPcm;
    transcribeAudio1(audioBuffer: Buffer): Promise<string>;
    transcribeAudio(audioBuffer: Buffer): Promise<string>;
}

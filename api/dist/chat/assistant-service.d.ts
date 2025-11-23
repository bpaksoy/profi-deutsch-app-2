import { ConfigService } from '@nestjs/config';
export declare class AssistantService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    getGeminiResponse(userInput: string): Promise<string>;
}

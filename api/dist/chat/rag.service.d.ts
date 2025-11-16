import { ConfigService } from '@nestjs/config';
export declare class RAGService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    generateResponseJson(userInput: string): Promise<any>;
}

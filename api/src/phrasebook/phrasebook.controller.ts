import { Controller, Get, Post, Body, Query, InternalServerErrorException, Logger } from '@nestjs/common';
import { PhrasebookService } from './phrasebook.service';

@Controller('phrasebook')
export class PhrasebookController {
    private readonly logger = new Logger(PhrasebookController.name);

    constructor(private readonly phrasebookService: PhrasebookService) { }

    @Post('phrases')
    async savePhrase(@Body() body: { german: string, context?: string, conversationId?: string, category?: string }) {
        // Dummy user ID for now
        const userId = 'user_default';

        if (!body.german) {
            throw new InternalServerErrorException('German text is required');
        }

        return this.phrasebookService.savePhrase(userId, body);
    }

    @Get('phrases')
    async getPhrases(@Query('category') category?: string) {
        const userId = 'user_default';
        return this.phrasebookService.getPhrases(userId, category);
    }

    @Get('categories')
    async getCategories() {
        // Return dummy categories or fetch from DB if we had a Category model populated
        return [
            { id: 'General', name: 'General', phraseCount: 0 },
            { id: 'Business', name: 'Business', phraseCount: 0 }
        ];
    }
}
import { Controller, Get, Post, Body, Query, InternalServerErrorException, Logger, UseGuards } from '@nestjs/common';
import { PhrasebookService } from './phrasebook.service';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('phrasebook')
@UseGuards(ClerkAuthGuard)
export class PhrasebookController {
    private readonly logger = new Logger(PhrasebookController.name);

    constructor(private readonly phrasebookService: PhrasebookService) { }

    @Post('phrases')
    async savePhrase(
        @GetUser() user: any,
        @Body() body: { german: string, context?: string, conversationId?: string, category?: string }
    ) {
        const userId = user.clerkId;
        if (!body.german) {
            throw new InternalServerErrorException('German text is required');
        }
        return this.phrasebookService.savePhrase(userId, body);
    }

    @Get('phrases')
    async getPhrases(
        @GetUser() user: any,
        @Query('category') category?: string
    ) {
        const userId = user.clerkId;
        return this.phrasebookService.getPhrases(userId, category);
    }

    @Get('categories')
    async getCategories() {
        // Categories could be global or per-user. For now, global list is fine.
        return this.phrasebookService.getCategories();
    }
}
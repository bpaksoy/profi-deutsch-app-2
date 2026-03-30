import {
    Controller, Get, Post, Delete, Patch, Body, Param, Query,
    InternalServerErrorException, Logger, UseGuards,
} from '@nestjs/common';
import { PhrasebookService } from './phrasebook.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('phrasebook')
@UseGuards(FirebaseAuthGuard)
export class PhrasebookController {
    private readonly logger = new Logger(PhrasebookController.name);

    constructor(private readonly phrasebookService: PhrasebookService) { }

    /**
     * POST /phrasebook/phrases — Save a new phrase
     */
    @Post('phrases')
    async savePhrase(
        @GetUser() user: any,
        @Body() body: { german: string; context?: string; conversationId?: string; category?: string },
    ) {
        const userId = user.clerkId;
        if (!body.german) {
            throw new InternalServerErrorException('German text is required');
        }
        return this.phrasebookService.savePhrase(userId, body);
    }

    /**
     * GET /phrasebook/phrases — Get all phrases (optionally filtered by category)
     */
    @Get('phrases')
    async getPhrases(
        @GetUser() user: any,
        @Query('category') category?: string,
    ) {
        const userId = user.clerkId;
        return this.phrasebookService.getPhrases(userId, category);
    }

    /**
     * DELETE /phrasebook/phrases/:id — Delete a phrase
     */
    @Delete('phrases/:id')
    async deletePhrase(
        @GetUser() user: any,
        @Param('id') phraseId: string,
    ) {
        const userId = user.clerkId;
        return this.phrasebookService.deletePhrase(userId, phraseId);
    }

    /**
     * PATCH /phrasebook/phrases/:id — Update a phrase (move category, edit text, add notes)
     */
    @Patch('phrases/:id')
    async updatePhrase(
        @GetUser() user: any,
        @Param('id') phraseId: string,
        @Body() body: { german?: string; context?: string; category?: string; notes?: string },
    ) {
        const userId = user.clerkId;
        return this.phrasebookService.updatePhrase(userId, phraseId, body);
    }

    /**
     * POST /phrasebook/phrases/:id/copy — Copy a phrase to another category
     */
    @Post('phrases/:id/copy')
    async copyPhrase(
        @GetUser() user: any,
        @Param('id') phraseId: string,
        @Body() body: { targetCategory: string },
    ) {
        const userId = user.clerkId;
        if (!body.targetCategory) {
            throw new InternalServerErrorException('Target category is required');
        }
        return this.phrasebookService.copyPhrase(userId, phraseId, body.targetCategory);
    }

    /**
     * GET /phrasebook/categories — Get all categories
     */
    @Get('categories')
    async getCategories(@GetUser() user: any) {
        return this.phrasebookService.getCategories(user.clerkId);
    }
}
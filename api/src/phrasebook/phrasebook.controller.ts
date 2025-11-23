import { Controller, Get, Post, Delete, Body, Param, Query, Logger } from '@nestjs/common';
import { PhrasebookService, Phrase, Category } from './phrasebook.service';

@Controller('phrasebook')
export class PhrasebookController {
    private readonly logger = new Logger(PhrasebookController.name);

    constructor(private readonly phrasebookService: PhrasebookService) {}

    @Get('categories')
    getCategories(): Category[] {
        return this.phrasebookService.getCategories();
    }

    @Post('categories')
    createCategory(@Body() body: { name: string }): Category {
        return this.phrasebookService.createCategory(body.name);
    }

    @Delete('categories/:id')
    deleteCategory(@Param('id') id: string): { success: boolean } {
        const success = this.phrasebookService.deleteCategory(id);
        return { success };
    }

    @Get('phrases')
    getPhrases(@Query('category') category?: string): Phrase[] {
        if (category) {
            return this.phrasebookService.getPhrasesByCategory(category);
        }
        return this.phrasebookService.getAllPhrases();
    }

    @Post('phrases')
    addPhrase(@Body() body: { 
        german: string; 
        category: string; 
        english?: string;
        context?: string;
    }): Phrase {
        return this.phrasebookService.addPhrase(
            body.german,
            body.category,
            body.english,
            body.context
        );
    }

    @Delete('phrases/:id')
    deletePhrase(@Param('id') id: string): { success: boolean } {
        const success = this.phrasebookService.deletePhrase(id);
        return { success };
    }

    @Get('search')
    searchPhrases(@Query('q') query: string): Phrase[] {
        return this.phrasebookService.searchPhrases(query);
    }
}
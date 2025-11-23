import { PhrasebookService, Phrase, Category } from './phrasebook.service';
export declare class PhrasebookController {
    private readonly phrasebookService;
    private readonly logger;
    constructor(phrasebookService: PhrasebookService);
    getCategories(): Category[];
    createCategory(body: {
        name: string;
    }): Category;
    deleteCategory(id: string): {
        success: boolean;
    };
    getPhrases(category?: string): Phrase[];
    addPhrase(body: {
        german: string;
        category: string;
        english?: string;
        context?: string;
    }): Phrase;
    deletePhrase(id: string): {
        success: boolean;
    };
    searchPhrases(query: string): Phrase[];
}

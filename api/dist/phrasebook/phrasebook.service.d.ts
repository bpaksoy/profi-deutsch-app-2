export interface Phrase {
    id: string;
    german: string;
    english?: string;
    context?: string;
    category: string;
    createdAt: Date;
}
export interface Category {
    id: string;
    name: string;
    phraseCount: number;
}
export declare class PhrasebookService {
    private readonly logger;
    private phrases;
    private categories;
    constructor();
    createCategory(name: string, id?: string): Category;
    getCategories(): Category[];
    addPhrase(german: string, category: string, english?: string, context?: string): Phrase;
    getPhrasesByCategory(category: string): Phrase[];
    getAllPhrases(): Phrase[];
    deletePhrase(phraseId: string): boolean;
    deleteCategory(categoryId: string): boolean;
    searchPhrases(query: string): Phrase[];
}

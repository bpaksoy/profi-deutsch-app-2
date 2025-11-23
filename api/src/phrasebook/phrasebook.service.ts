import { Injectable, Logger } from '@nestjs/common';

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

@Injectable()
export class PhrasebookService {
    private readonly logger = new Logger(PhrasebookService.name);
    
    // In-memory storage (replace with database later)
    private phrases: Map<string, Phrase[]> = new Map();
    private categories: Map<string, Category> = new Map();

    constructor() {
        // Initialize with default categories
        this.createCategory('Meetings', 'meetings');
        this.createCategory('Emails', 'emails');
        this.createCategory('Phone Calls', 'phone-calls');
    }

    createCategory(name: string, id?: string): Category {
        const categoryId = id || `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const category: Category = {
            id: categoryId,
            name,
            phraseCount: 0
        };
        this.categories.set(categoryId, category);
        this.phrases.set(categoryId, []);
        this.logger.log(`Created category: ${name}`);
        return category;
    }

    getCategories(): Category[] {
        return Array.from(this.categories.values()).map(cat => ({
            ...cat,
            phraseCount: this.phrases.get(cat.id)?.length || 0
        }));
    }

    addPhrase(german: string, category: string, english?: string, context?: string): Phrase {
        // Ensure category exists
        if (!this.categories.has(category)) {
            this.createCategory(category, category);
        }

        const phrase: Phrase = {
            id: `phrase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            german,
            english,
            context,
            category,
            createdAt: new Date()
        };

        const categoryPhrases = this.phrases.get(category) || [];
        categoryPhrases.push(phrase);
        this.phrases.set(category, categoryPhrases);

        this.logger.log(`Added phrase to ${category}: ${german}`);
        return phrase;
    }

    getPhrasesByCategory(category: string): Phrase[] {
        return this.phrases.get(category) || [];
    }

    getAllPhrases(): Phrase[] {
        const allPhrases: Phrase[] = [];
        this.phrases.forEach(phrases => allPhrases.push(...phrases));
        return allPhrases.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    deletePhrase(phraseId: string): boolean {
        for (const [category, phrases] of this.phrases.entries()) {
            const index = phrases.findIndex(p => p.id === phraseId);
            if (index !== -1) {
                phrases.splice(index, 1);
                this.phrases.set(category, phrases);
                this.logger.log(`Deleted phrase: ${phraseId}`);
                return true;
            }
        }
        return false;
    }

    deleteCategory(categoryId: string): boolean {
        if (this.categories.has(categoryId)) {
            this.categories.delete(categoryId);
            this.phrases.delete(categoryId);
            this.logger.log(`Deleted category: ${categoryId}`);
            return true;
        }
        return false;
    }

    searchPhrases(query: string): Phrase[] {
        const allPhrases = this.getAllPhrases();
        const lowerQuery = query.toLowerCase();
        return allPhrases.filter(phrase => 
            phrase.german.toLowerCase().includes(lowerQuery) ||
            phrase.english?.toLowerCase().includes(lowerQuery) ||
            phrase.context?.toLowerCase().includes(lowerQuery)
        );
    }
}
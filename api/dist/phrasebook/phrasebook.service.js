"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PhrasebookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhrasebookService = void 0;
const common_1 = require("@nestjs/common");
let PhrasebookService = PhrasebookService_1 = class PhrasebookService {
    constructor() {
        this.logger = new common_1.Logger(PhrasebookService_1.name);
        this.phrases = new Map();
        this.categories = new Map();
        this.createCategory('Meetings', 'meetings');
        this.createCategory('Emails', 'emails');
        this.createCategory('Phone Calls', 'phone-calls');
    }
    createCategory(name, id) {
        const categoryId = id || `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const category = {
            id: categoryId,
            name,
            phraseCount: 0
        };
        this.categories.set(categoryId, category);
        this.phrases.set(categoryId, []);
        this.logger.log(`Created category: ${name}`);
        return category;
    }
    getCategories() {
        return Array.from(this.categories.values()).map(cat => ({
            ...cat,
            phraseCount: this.phrases.get(cat.id)?.length || 0
        }));
    }
    addPhrase(german, category, english, context) {
        if (!this.categories.has(category)) {
            this.createCategory(category, category);
        }
        const phrase = {
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
    getPhrasesByCategory(category) {
        return this.phrases.get(category) || [];
    }
    getAllPhrases() {
        const allPhrases = [];
        this.phrases.forEach(phrases => allPhrases.push(...phrases));
        return allPhrases.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    deletePhrase(phraseId) {
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
    deleteCategory(categoryId) {
        if (this.categories.has(categoryId)) {
            this.categories.delete(categoryId);
            this.phrases.delete(categoryId);
            this.logger.log(`Deleted category: ${categoryId}`);
            return true;
        }
        return false;
    }
    searchPhrases(query) {
        const allPhrases = this.getAllPhrases();
        const lowerQuery = query.toLowerCase();
        return allPhrases.filter(phrase => phrase.german.toLowerCase().includes(lowerQuery) ||
            phrase.english?.toLowerCase().includes(lowerQuery) ||
            phrase.context?.toLowerCase().includes(lowerQuery));
    }
};
exports.PhrasebookService = PhrasebookService;
exports.PhrasebookService = PhrasebookService = PhrasebookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PhrasebookService);
//# sourceMappingURL=phrasebook.service.js.map
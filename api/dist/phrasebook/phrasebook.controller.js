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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PhrasebookController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhrasebookController = void 0;
const common_1 = require("@nestjs/common");
const phrasebook_service_1 = require("./phrasebook.service");
let PhrasebookController = PhrasebookController_1 = class PhrasebookController {
    constructor(phrasebookService) {
        this.phrasebookService = phrasebookService;
        this.logger = new common_1.Logger(PhrasebookController_1.name);
    }
    getCategories() {
        return this.phrasebookService.getCategories();
    }
    createCategory(body) {
        return this.phrasebookService.createCategory(body.name);
    }
    deleteCategory(id) {
        const success = this.phrasebookService.deleteCategory(id);
        return { success };
    }
    getPhrases(category) {
        if (category) {
            return this.phrasebookService.getPhrasesByCategory(category);
        }
        return this.phrasebookService.getAllPhrases();
    }
    addPhrase(body) {
        return this.phrasebookService.addPhrase(body.german, body.category, body.english, body.context);
    }
    deletePhrase(id) {
        const success = this.phrasebookService.deletePhrase(id);
        return { success };
    }
    searchPhrases(query) {
        return this.phrasebookService.searchPhrases(query);
    }
};
exports.PhrasebookController = PhrasebookController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], PhrasebookController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PhrasebookController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], PhrasebookController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Get)('phrases'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], PhrasebookController.prototype, "getPhrases", null);
__decorate([
    (0, common_1.Post)('phrases'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PhrasebookController.prototype, "addPhrase", null);
__decorate([
    (0, common_1.Delete)('phrases/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], PhrasebookController.prototype, "deletePhrase", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], PhrasebookController.prototype, "searchPhrases", null);
exports.PhrasebookController = PhrasebookController = PhrasebookController_1 = __decorate([
    (0, common_1.Controller)('phrasebook'),
    __metadata("design:paramtypes", [phrasebook_service_1.PhrasebookService])
], PhrasebookController);
//# sourceMappingURL=phrasebook.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhrasebookModule = void 0;
const common_1 = require("@nestjs/common");
const phrasebook_controller_1 = require("./phrasebook.controller");
const phrasebook_service_1 = require("./phrasebook.service");
let PhrasebookModule = class PhrasebookModule {
};
exports.PhrasebookModule = PhrasebookModule;
exports.PhrasebookModule = PhrasebookModule = __decorate([
    (0, common_1.Module)({
        controllers: [phrasebook_controller_1.PhrasebookController],
        providers: [phrasebook_service_1.PhrasebookService],
        exports: [phrasebook_service_1.PhrasebookService]
    })
], PhrasebookModule);
//# sourceMappingURL=phrasebook.module.js.map
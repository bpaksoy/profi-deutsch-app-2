import { Module } from '@nestjs/common';
import { PhrasebookController } from './phrasebook.controller';
import { PhrasebookService } from './phrasebook.service';

@Module({
    controllers: [PhrasebookController],
    providers: [PhrasebookService],
    exports: [PhrasebookService]
})
export class PhrasebookModule {}
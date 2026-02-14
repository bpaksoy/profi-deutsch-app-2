import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RAGService } from './rag.service';
import { AzureSpeechService } from './azure-speech.service';
import { AssistantService } from './assistant-service';
import { ConversationService } from './conversation.service';
import { ProgressModule } from '../progress/progress.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ProgressModule, PrismaModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    RAGService,
    AzureSpeechService,
    AssistantService,
    ConversationService
  ],
  exports: [ChatService, RAGService, AzureSpeechService, AssistantService, ConversationService]
})
export class ChatModule { }
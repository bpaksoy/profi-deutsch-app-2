import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RAGService } from './rag.service';
import { AzureSpeechService } from './azure-speech.service';
import { AssistantService } from './assistant-service';
import { ProgressService } from '../progress/progress.service';
import { ConversationService } from './conversation.service';

@Module({
  imports: [/* If you had other modules */],
  controllers: [ChatController],
  providers: [
    ChatService,
    RAGService,
    AzureSpeechService,
    AssistantService,
    ProgressService,
    ConversationService
  ],
  exports: [ChatService, RAGService, AzureSpeechService, AssistantService, ConversationService] // Export the service if other modules will use it
})
export class ChatModule { }
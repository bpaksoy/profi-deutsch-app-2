import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RAGService } from './rag.service';  
import { AzureSpeechService } from './azure-speech.service';
import { AssistantService } from './assistant-service';

@Module({
  imports: [/* If you had other modules */],
  controllers: [ChatController],
  providers: [
    ChatService, 
    RAGService,
    AzureSpeechService,
    AssistantService
  ],
  exports: [ChatService, RAGService, AzureSpeechService, AssistantService] // Export the service if other modules will use it
})
export class ChatModule {}
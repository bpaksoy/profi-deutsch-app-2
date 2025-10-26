import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [/* If you had other modules */],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService] // Export the service if other modules will use it
})
export class ChatModule {}
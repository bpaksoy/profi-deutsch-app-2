// api/src/chat/chat.controller.ts

import { Controller, Get, Query, Res, InternalServerErrorException, Header, Logger } from '@nestjs/common';
import { Response } from 'express'; 
import { ChatService } from './chat.service';

@Controller('chat') // The base route will be /chat/tts
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  @Get('tts')
  @Header('Content-Type', 'audio/mpeg') // Tell the browser what to expect
  @Header('Cache-Control', 'no-cache') // Important to ensure the stream is fresh
  async getTtsStream(
    @Query('text') text: string,
    @Res() res: Response // NestJS injects the Express response object here
  ): Promise<void> {
    if (!text) {
        throw new InternalServerErrorException('Text parameter is required.');
    }

    try {
      this.logger.log('Receiving TTS request, sending to service...');
      // 1. Get the readable stream from the service
      const audioStream = await this.chatService.generateSpeechStream(text);
      
      // 2. Pipe the stream directly to the Express response
      // This is the fastest way to stream data from a third party to the client
      audioStream.pipe(res);
      
      // The stream automatically handles the response closing when finished

    } catch (error) {
      this.logger.error('Streaming Error:', error.message);
      // Ensure the response is sent even on error
      if (!res.headersSent) {
          res.status(500).send('Audio stream failed.');
      }
    }
  }
}
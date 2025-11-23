
import { Controller, Get, Query, Res, InternalServerErrorException, Header, Logger, Post, UseInterceptors, UploadedFile, Body,  Session } from '@nestjs/common';
import { Response } from 'express'; 
import { ChatService } from './chat.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RAGService } from './rag.service'; 
import { AzureSpeechService } from './azure-speech.service'; 
import { AssistantService } from './assistant-service';
interface ChatRequestDTO {
    message: string;
}


@Controller('chat') // The base route will be /chat/tts
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly ragService: RAGService,
    private readonly azureSpeechService: AzureSpeechService,
    private readonly assistantService: AssistantService
  ) {}

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


  @Post('stt')
    @UseInterceptors(FileInterceptor('audio'))
    async transcribeAndProcess(
        @UploadedFile() file: Express.Multer.File, 
        @Body() body: any,
        @Session() session: Record<string, any>  // ✅ Get session
    ) {
        this.logger.log(`Received audio file of size: ${file.size}`);
        
        // ✅ Get or create session ID
        if (!session.conversationId) {
            session.conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            this.logger.log(`Created new conversation ID: ${session.conversationId}`);
        }
        
        // 1. Transcribe the audio buffer
        const transcription = await this.azureSpeechService.transcribeAudio(file.buffer);
        
        // 2. Get AI response with conversation history
        const ragObject = await this.ragService.generateResponseJson(
            transcription,
            session.conversationId  // ✅ Pass session ID
        );
        
        // 3. Generate TTS audio for the AI response
        const audioStream = await this.chatService.generateSpeechStream(ragObject.responseText);
        
        // Convert stream to buffer
        const audioChunks: Buffer[] = [];
        for await (const chunk of audioStream) {
            audioChunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(audioChunks);
        
        // 4. Return both text and audio as base64
        return {
            transcript: transcription,
            responseText: ragObject.responseText,
            audioBase64: audioBuffer.toString('base64'),
        };
    }

    // ✅ Add endpoint to reset conversation
    @Post('reset-conversation')
    async resetConversation(@Session() session: Record<string, any>) {
        if (session.conversationId) {
            this.ragService.clearConversation(session.conversationId);
            delete session.conversationId;
            this.logger.log('Conversation reset');
        }
        return { success: true };
    }

  @Get('test-gemini')
  async testGemini() {
      await this.ragService.testGeminiConnection();
      return { status: 'Check server logs for available models' };
  }
}
import { Controller, Get, Query, Res, InternalServerErrorException, Header, Logger, Post, Patch, Delete, UseInterceptors, UploadedFile, Body, Session, Param, UseGuards, ForbiddenException } from '@nestjs/common';

import { Response } from 'express';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { ChatService } from './chat.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RAGService } from './rag.service';
import { AzureSpeechService } from './azure-speech.service';
import { AssistantService } from './assistant-service';
import { ProgressService } from '../progress/progress.service';
import { ConversationService } from './conversation.service';

@Controller('chat')
@UseGuards(ClerkAuthGuard)
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly ragService: RAGService,
    private readonly azureSpeechService: AzureSpeechService,
    private readonly assistantService: AssistantService,
    private readonly progressService: ProgressService,
    private readonly conversationService: ConversationService
  ) { }

  @Get('tts')
  @Header('Content-Type', 'audio/mpeg')
  @Header('Cache-Control', 'no-cache')
  async getTtsStream(
    @Query('text') text: string,
    @Res() res: Response
  ): Promise<void> {
    if (!text) {
      throw new InternalServerErrorException('Text parameter is required.');
    }

    try {
      this.logger.log('Receiving TTS request, sending to service...');
      const audioStream = await this.chatService.generateSpeechStream(text);
      audioStream.pipe(res);
    } catch (error) {
      this.logger.error('Streaming Error:', error.message);
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
    @Session() session: Record<string, any>,
    @GetUser() user: any
  ) {
    const userId = user.clerkId;
    
    // Usage limits check
    const dbUser = await this.conversationService.validateUserPlan(userId);
    const progress = await this.progressService.getUserProgress(userId);
    const LIMIT = 20;

    if (dbUser.planTier === 'FREE' && progress.conversationCount >= LIMIT) {
      throw new InternalServerErrorException(`Limit reached. Please upgrade to a paid plan to continue chatting with Flo. ${process.env.FRONTEND_URL}/pricing`);
    }

    this.logger.log(`Received audio file of size: ${file.size} from user ${userId}`);

    let conversationId = body.conversationId || session.conversationId;

    if (!conversationId) {
      const conv = await this.conversationService.createConversation(userId, 'Voice Chat');
      conversationId = conv.id;
      session.conversationId = conversationId;
    }

    const transcription = await this.azureSpeechService.transcribeAudio(file.buffer);
    await this.conversationService.addMessage(conversationId, 'user', transcription);

    const ragObject = await this.ragService.generateResponseJson(
      transcription,
      conversationId
    );

    await this.conversationService.addMessage(conversationId, 'assistant', ragObject.responseText);
    const audioStream = await this.chatService.generateSpeechStream(ragObject.responseText);

    const audioChunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      audioChunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(audioChunks);

    await this.progressService.trackActivity(userId, 'message', 1);

    return {
      transcript: transcription,
      responseText: ragObject.responseText,
      audioBase64: audioBuffer.toString('base64'),
      conversationId: conversationId
    };
  }

  @Post('text')
  async processText(
    @Body() body: { message: string, conversationId?: string },
    @Session() session: Record<string, any>,
    @GetUser() user: any
  ) {
    const { message } = body;
    const userId = user.clerkId;

    // Usage limits check
    const dbUser = await this.conversationService.validateUserPlan(userId);
    const progress = await this.progressService.getUserProgress(userId);
    const LIMIT = 20;

    if (dbUser.planTier === 'FREE' && progress.conversationCount >= LIMIT) {
      // Throw 403 Forbidden via InternalServerError (or better)
      throw new InternalServerErrorException(`Nutzungsgrenze erreicht. Bitte upgrade deinen Plan für unbegrenzte Chats! ${process.env.FRONTEND_URL}/pricing`);
    }

    this.logger.log(`Received text message from ${userId}: ${message} `);

    if (!message || message.trim() === '') {
      throw new InternalServerErrorException('Message cannot be empty');
    }

    let conversationId = body.conversationId || session.conversationId;

    if (!conversationId) {
      const conv = await this.conversationService.createConversation(userId, 'Text Chat');
      conversationId = conv.id;
      session.conversationId = conversationId;
    }

    await this.conversationService.addMessage(conversationId, 'user', message);
    const ragObject = await this.ragService.generateResponseJson(
      message,
      conversationId
    );

    await this.conversationService.addMessage(conversationId, 'assistant', ragObject.responseText);

    let audioBase64 = '';
    try {
      const audioStream = await this.chatService.generateSpeechStream(ragObject.responseText);
      const audioChunks: Buffer[] = [];
      for await (const chunk of audioStream) {
        audioChunks.push(chunk);
      }
      const audioBuffer = Buffer.concat(audioChunks);
      audioBase64 = audioBuffer.toString('base64');
    } catch (ttsError) {
      this.logger.warn(`TTS generation failed: ${ttsError.message}`);
    }

    await this.progressService.trackActivity(userId, 'message', 1);

    return {
      transcript: message,
      responseText: ragObject.responseText,
      audioBase64: audioBase64,
      conversationId: conversationId
    };
  }

  @Post('reset-conversation')
  async resetConversation(@Session() session: Record<string, any>) {
    if (session.conversationId) {
      this.ragService.clearConversation(session.conversationId);
      delete session.conversationId;
      this.logger.log('Conversation reset');
    }
    return { success: true };
  }

  @Get('conversations')
  async getConversations(@GetUser() user: any) {
    return this.conversationService.getConversations(user.clerkId);
  }

  @Get('conversations/:id/messages')
  async getMessages(@Param('id') id: string) {
    return this.conversationService.getMessages(id);
  }

  @Post('conversations')
  async createConversation(@GetUser() user: any) {
    return this.conversationService.createConversation(user.clerkId, 'Neues Gespräch');
  }

  @Patch('conversations/:id')
  async updateConversation(
    @Param('id') id: string,
    @Body() body: { topic: string },
    @GetUser() user: any
  ) {
    return this.conversationService.updateConversation(id, user.clerkId, body.topic);
  }

  @Delete('conversations/:id')
  async deleteConversation(
    @Param('id') id: string,
    @GetUser() user: any
  ) {
    return this.conversationService.deleteConversation(id, user.clerkId);
  }

  @Get('test-gemini')
  async testGemini() {
    await this.ragService.testGeminiConnection();
    return { status: 'Check server logs for available models' };
  }
}
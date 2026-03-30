import { Controller, Get, Query, Res, InternalServerErrorException, Header, Logger, Post, Patch, Delete, Body, Session, Param, UseGuards, ForbiddenException } from '@nestjs/common';

import { Response } from 'express';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { ChatService } from './chat.service';
import { RAGService } from './rag.service';
import { AzureSpeechService } from './azure-speech.service';
import { AssistantService } from './assistant-service';
import { ProgressService } from '../progress/progress.service';
import { ConversationService } from './conversation.service';

@Controller('chat')
@UseGuards(FirebaseAuthGuard)
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
  async transcribeAndProcess(
    @Body() body: { audioBase64: string; conversationId?: string },
    @Session() session: Record<string, any>,
    @GetUser() user: any
  ) {
    try {
      const userId = user.clerkId;
      
      // Usage limits check
      const dbUser = await this.conversationService.validateUserPlan(userId);
      const LIMIT = 500;

      // Check if it's a new day to allow first message even if counter is high
      const now = new Date();
      const last = dbUser.lastMessageAt ? new Date(dbUser.lastMessageAt) : null;
      const isNewDay = !last || now.toDateString() !== last.toDateString();

      if (dbUser.planTier === 'FREE' && !isNewDay && dbUser.dailyMessagesCount >= LIMIT) {
        throw new ForbiddenException(`Daily chat limit reached. Please upgrade to a paid plan for unlimited access or try again tomorrow! ${process.env.FRONTEND_URL}/pricing`);
      }

      if (!body.audioBase64) {
        this.logger.error('No audio data received in request');
        throw new InternalServerErrorException('No audio data provided');
      }

      const audioBuffer = Buffer.from(body.audioBase64, 'base64');
      this.logger.log(`Received audio data of size: ${audioBuffer.length} bytes from user ${userId}`);

      let conversationId = body.conversationId || session?.conversationId;

      if (!conversationId) {
        const conv = await this.conversationService.createConversation(userId, 'Voice Chat');
        conversationId = conv.id;
        if (session) session.conversationId = conversationId;
      }

      this.logger.log(`Starting transcription for ${audioBuffer.length} bytes`);
      const transcription = await this.azureSpeechService.transcribeAudio(audioBuffer);
      this.logger.log(`Transcription completed: "${transcription}"`);
      
      if (!transcription || transcription.trim() === '') {
        this.logger.warn('Empty transcription received');
        throw new InternalServerErrorException('Could not transcribe audio - please try speaking more clearly');
      }

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
      const ttsBuffer = Buffer.concat(audioChunks);

      await this.progressService.trackActivity(userId, 'message', 1);

      return {
        transcript: transcription,
        responseText: ragObject.responseText,
        audioBase64: ttsBuffer.toString('base64'),
        conversationId: conversationId
      };
    } catch (error) {
      this.logger.error('STT endpoint error:', error.message, error.stack);
      throw error;
    }
  }

  @Post('text')
  async processText(
    @Body() body: { message: string, conversationId?: string },
    @Res() res: Response,
    @GetUser() user: any
  ) {
    const { message } = body;
    const userId = user.clerkId;

    // Usage limits check
    const dbUser = await this.conversationService.validateUserPlan(userId);
    const LIMIT = 500;

    const now = new Date();
    const last = dbUser.lastMessageAt ? new Date(dbUser.lastMessageAt) : null;
    const isNewDay = !last || now.toDateString() !== last.toDateString();

    if (dbUser.planTier === 'FREE' && !isNewDay && dbUser.dailyMessagesCount >= LIMIT) {
      res.status(403).json({ message: `Limit reached. Please upgrade to a paid plan or come back tomorrow! ${process.env.FRONTEND_URL}/pricing` });
      return;
    }

    this.logger.log(`Received text message from ${userId}: ${message} `);

    if (!message || message.trim() === '') {
      res.status(500).json({ message: 'Message cannot be empty' });
      return;
    }

    let conversationId = body.conversationId;

    if (!conversationId) {
      const conv = await this.conversationService.createConversation(userId, 'Text Chat');
      conversationId = conv.id;
    }

    await this.conversationService.addMessage(conversationId, 'user', message);

    // Set up SSE streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    let fullText = '';
    try {
      for await (const chunk of this.ragService.streamResponse(message, conversationId)) {
        fullText += chunk;
        res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`);
      }

      // Clean up markdown from accumulated text
      fullText = fullText
        .replace(/\*\*\*/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/`{1,3}/g, '')
        .trim();

      // Fire-and-forget: save message and track activity in parallel
      Promise.all([
        this.conversationService.addMessage(conversationId, 'assistant', fullText),
        this.progressService.trackActivity(userId, 'message', 1)
      ]).catch(err => this.logger.error('Background save error:', err.message));

      res.write(`data: ${JSON.stringify({ type: 'done', conversationId, fullText })}\n\n`);
      res.end();
    } catch (error) {
      this.logger.error('Streaming error:', error.message);
      res.write(`data: ${JSON.stringify({ type: 'error', message: 'Fehler bei der Antwort.' })}\n\n`);
      res.end();
    }
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
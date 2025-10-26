// api/src/chat/chat.service.ts (Final Clean Code)

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ElevenLabsModule from '@elevenlabs/client'; // <-- USE THE STAR IMPORT
import { Readable } from 'stream';

const ElevenLabs = (ElevenLabsModule as any).ElevenLabs || (ElevenLabsModule as any).default || ElevenLabsModule;


@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private elevenlabs: any; // <-- Corrected type
  private readonly DEFAULT_VOICE_ID = 'YOUR_GERMAN_VOICE_ID'; 

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ELEVENLABS_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('ELEVENLABS_API_KEY is not configured.');
    }
    this.elevenlabs = new ElevenLabs({ apiKey }); // <-- Corrected instantiation
  }

  async generateSpeechStream(text: string): Promise<Readable> {
    try {
      this.logger.log(`Generating speech for text: "${text.substring(0, 30)}…"`);
      
      const response = await this.elevenlabs.textToSpeech.convert({ // <-- Corrected call for THIS SDK
        voice_id: this.DEFAULT_VOICE_ID,
        text: text,
        model_id: 'eleven_multilingual_v2',
        output_format: 'mp3_44100_128',
      });
      
      return Readable.from(response);
    } catch (error: any) {
      this.logger.error('ElevenLabs API Error:', error.message);
      throw new Error('Failed to generate speech audio stream.');
    }
  }
}
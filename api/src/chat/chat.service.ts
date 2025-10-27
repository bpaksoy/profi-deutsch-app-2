
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'; 
import { Readable } from 'stream';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private elevenlabs: ElevenLabsClient; // Correct type
  private readonly DEFAULT_VOICE_ID: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ELEVENLABS_API_KEY');
    this.DEFAULT_VOICE_ID = this.configService.get<string>('ELEVENLABS_VOICE_ID');

    if (!apiKey) {
      throw new InternalServerErrorException('ELEVENLABS_API_KEY is not configured.');
    }
    
    this.elevenlabs = new ElevenLabsClient({ apiKey }); 
  }
  
  async generateSpeechStream(text: string): Promise<Readable> {
    try {
      this.logger.log(`Generating speech for text: "${text.substring(0, 30)}…"`);
      
      const response = await this.elevenlabs.textToSpeech.convert(
        this.DEFAULT_VOICE_ID, 
        {
          text,
          modelId: 'eleven_multilingual_v2',
          outputFormat: 'mp3_44100_128',
        }
      );
      
      return Readable.from(response);
    } catch (error: any) {
      this.logger.error('ElevenLabs API Error:', error.message);
      throw new Error('Failed to generate speech audio stream.');
    }
  }
}
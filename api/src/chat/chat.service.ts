
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { Readable } from 'stream';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly SPEECH_CONFIG: sdk.SpeechConfig;
  private readonly DEFAULT_TTS_VOICE = "de-DE-KatjaNeural"; // High-quality German voice

  constructor(private configService: ConfigService) {
    const key = this.configService.get('AZURE_SPEECH_KEY');
    const region = this.configService.get('AZURE_SPEECH_REGION');
    
    if (!key || !region) {
      throw new InternalServerErrorException('Azure Speech Key or Region not configured.');
    }
    
    this.SPEECH_CONFIG = sdk.SpeechConfig.fromSubscription(key, region);
    this.SPEECH_CONFIG.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3;
  }

  // --- TEXT-TO-SPEECH (TTS) ---
  async generateSpeechStream(text: string): Promise<Readable> {
    return new Promise<Readable>((resolve, reject) => {
        // Create an audio stream synthesizer
        const synthesizer = new sdk.SpeechSynthesizer(this.SPEECH_CONFIG, undefined);
        
        synthesizer.speakTextAsync(
            text,
            result => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    const audioData = Buffer.from(result.audioData);
                    
                    // The audio stream is now a readable stream we can pipe
                    resolve(Readable.from(audioData));
                } else {
                    reject(new Error(`Speech synthesis failed: ${result.errorDetails}`));
                }
                synthesizer.close();
            }
        );
    });
  }
  
    // --- SPEECH-TO-TEXT (STT) ---
  async transcribeAudio(audioBuffer: Buffer): Promise<string> {
    // This part requires piping the audio buffer into an Azure StreamRecognizer
    // It's more complex, but follows the same pattern: configure, send audio, get text result.
    // ... Simplified: You would implement the STT logic here ...
    this.logger.warn('STT function needs full implementation.');
    return 'Transcribed text from user audio.';
  }
}
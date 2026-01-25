import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { spawn } from 'child_process';

@Injectable()
export class AzureSpeechService {
    private readonly logger = new Logger(AzureSpeechService.name);

    constructor(private readonly configService: ConfigService) { }

    private async convertToPcm(audioBuffer: Buffer): Promise<Buffer> {
        this.logger.log('Starting audio conversion to PCM...');
        return new Promise((resolve, reject) => {
            const ffmpeg = spawn('ffmpeg', [
                '-i', 'pipe:0',           // Input from stdin
                '-f', 's16le',            // Output format: signed 16-bit little-endian PCM
                '-ar', '16000',           // Sample rate: 16kHz (required by Azure)
                '-ac', '1',               // Audio channels: mono
                '-acodec', 'pcm_s16le',   // Audio codec
                'pipe:1'                  // Output to stdout
            ]);

            const chunks: Buffer[] = [];

            ffmpeg.stdout.on('data', chunk => {
                this.logger.debug(`Received chunk: ${chunk.length} bytes`);
                chunks.push(chunk);
            });

            ffmpeg.stderr.on('data', chunk => {
                this.logger.debug(`ffmpeg: ${chunk.toString()}`);
            });

            ffmpeg.on('error', (err) => {
                this.logger.error('ffmpeg process error:', err);
                reject(err);
            });

            ffmpeg.on('close', code => {
                if (code !== 0) {
                    this.logger.error(`ffmpeg exited with code ${code}`);
                    return reject(new Error(`ffmpeg exited with code ${code}`));
                }
                const pcmBuffer = Buffer.concat(chunks);
                this.logger.log(`✓ Converted audio to PCM: ${pcmBuffer.length} bytes`);
                resolve(pcmBuffer);
            });

            this.logger.log(`Writing ${audioBuffer.length} bytes to ffmpeg...`);
            ffmpeg.stdin.write(audioBuffer);
            ffmpeg.stdin.end();
        });
    }

    async transcribeAudio1(audioBuffer: Buffer): Promise<string> {
        try {
            const speechKey = this.configService.get<string>('AZURE_SPEECH_KEY');
            const speechRegion = this.configService.get<string>('AZURE_SPEECH_REGION');

            if (!speechKey || !speechRegion) {
                throw new Error('Azure Speech configuration is missing!');
            }

            this.logger.log(`Original audio buffer size: ${audioBuffer.length} bytes`);

            // ✅ CONVERT AUDIO TO PCM FORMAT
            const pcmBuffer = await this.convertToPcm(audioBuffer);

            if (pcmBuffer.length === 0) {
                this.logger.error('PCM conversion resulted in empty buffer!');
                return '';
            }

            // Create audio format for 16kHz, 16-bit, mono PCM
            const audioFormat = sdk.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);

            // Create a push stream with the format
            const pushStream = sdk.AudioInputStream.createPushStream(audioFormat);

            // Convert Buffer to ArrayBuffer
            const arrayBuffer = new ArrayBuffer(pcmBuffer.length);
            const view = new Uint8Array(arrayBuffer);
            pcmBuffer.copy(view as any);

            this.logger.log(`Writing ${arrayBuffer.byteLength} bytes to Azure stream...`);

            // Write the audio data to the stream
            pushStream.write(arrayBuffer);
            pushStream.close();

            // Create audio config from the stream
            const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

            // Create speech config
            const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
            speechConfig.speechRecognitionLanguage = 'de-DE';

            const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

            return new Promise((resolve, reject) => {
                recognizer.recognizeOnceAsync(
                    result => {
                        this.logger.log(`Recognition result reason: ${sdk.ResultReason[result.reason]}`);

                        recognizer.close();

                        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                            this.logger.log(`✓ Recognized text: ${result.text}`);
                            resolve(result.text);
                        } else if (result.reason === sdk.ResultReason.NoMatch) {
                            this.logger.warn('No speech could be recognized');
                            const noMatchDetail = sdk.NoMatchDetails.fromResult(result);
                            this.logger.warn(`NoMatch reason: ${sdk.NoMatchReason[noMatchDetail.reason]}`);
                            resolve('');
                        } else if (result.reason === sdk.ResultReason.Canceled) {
                            const cancellation = sdk.CancellationDetails.fromResult(result);
                            this.logger.error(`Recognition canceled: ${cancellation.reason}`);
                            this.logger.error(`Error code: ${cancellation.ErrorCode}`);
                            this.logger.error(`Error details: ${cancellation.errorDetails}`);
                            reject(new Error(`Recognition canceled: ${cancellation.errorDetails}`));
                        } else {
                            this.logger.warn(`Unexpected result reason: ${sdk.ResultReason[result.reason]}`);
                            resolve('');
                        }
                    },
                    err => {
                        recognizer.close();
                        this.logger.error('Azure Speech recognition error:', err);
                        reject(err);
                    }
                );
            });
        } catch (err) {
            this.logger.error('transcribeAudio threw exception:', err);
            throw err;
        }
    }

    async transcribeAudio(audioBuffer: Buffer): Promise<string> {
        try {
            const speechKey = this.configService.get<string>('AZURE_SPEECH_KEY');
            const speechRegion = this.configService.get<string>('AZURE_SPEECH_REGION');

            if (!speechKey || !speechRegion) {
                throw new Error('Azure Speech configuration is missing!');
            }
            this.logger.log(`Original audio buffer size: ${audioBuffer.length} bytes`);
            // ✅ CONVERT AUDIO TO PCM FORMAT
            const pcmBuffer = await this.convertToPcm(audioBuffer);

            if (pcmBuffer.length === 0) {
                this.logger.error('PCM conversion resulted in empty buffer!');
                return '';
            }
            // Create audio format for 16kHz, 16-bit, mono PCM
            const audioFormat = sdk.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);

            // Create a push stream with the format
            const pushStream = sdk.AudioInputStream.createPushStream(audioFormat);

            // Convert Buffer to ArrayBuffer
            const arrayBuffer = new ArrayBuffer(pcmBuffer.length);
            const view = new Uint8Array(arrayBuffer);
            pcmBuffer.copy(view as any);

            this.logger.log(`Writing ${arrayBuffer.byteLength} bytes to Azure stream...`);

            // Write the audio data to the stream
            pushStream.write(arrayBuffer);
            pushStream.close();
            // Create audio config from the stream
            const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

            // Create speech config
            const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);



            // ✅ ADD THESE 3 LINES (new multi-language auto-detection):
            const autoDetectSourceLanguageConfig = sdk.AutoDetectSourceLanguageConfig.fromLanguages([
                'de-DE',  // German
                'en-US'   // English
            ]);

            // ✅ MODIFY THIS LINE (use fromConfig method for auto-detection):
            const recognizer = sdk.SpeechRecognizer.FromConfig(
                speechConfig,
                autoDetectSourceLanguageConfig,
                audioConfig
            );

            return new Promise((resolve, reject) => {
                let fullText = "";

                recognizer.recognized = (s, e) => {
                    if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
                        this.logger.log(`✓ Recognized segment: ${e.result.text}`);
                        fullText += e.result.text + " ";
                    }
                };

                recognizer.canceled = (s, e) => {
                    this.logger.log(`Recognition Canceled: ${e.reason}`);
                    if (e.reason === sdk.CancellationReason.Error) {
                        this.logger.error(`Error details: ${e.errorDetails}`);
                        reject(new Error(`Recognition canceled: ${e.errorDetails}`));
                    } else {
                        recognizer.stopContinuousRecognitionAsync(() => {
                            recognizer.close();
                            resolve(fullText.trim());
                        });
                    }
                };

                recognizer.sessionStopped = (s, e) => {
                    this.logger.log('Recognition Session Stopped');
                    recognizer.stopContinuousRecognitionAsync(() => {
                        recognizer.close();
                        resolve(fullText.trim());
                    });
                };

                recognizer.startContinuousRecognitionAsync(() => {
                    this.logger.log('Continuous recognition started');
                }, err => {
                    this.logger.error(`Failed to start recognition: ${err}`);
                    reject(err);
                });
            });
        } catch (err) {
            this.logger.error('transcribeAudio threw exception:', err);
            throw err;
        }
    }

}

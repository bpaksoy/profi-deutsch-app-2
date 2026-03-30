import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

@Injectable()
export class AzureSpeechService {
    private readonly logger = new Logger(AzureSpeechService.name);

    constructor(private readonly configService: ConfigService) { }

    async transcribeAudio(audioBuffer: Buffer): Promise<string> {
        try {
            const speechKey = this.configService.get<string>('AZURE_SPEECH_KEY');
            const speechRegion = this.configService.get<string>('AZURE_SPEECH_REGION');

            if (!speechKey || !speechRegion) {
                throw new Error('Azure Speech configuration is missing!');
            }

            this.logger.log(`Transcribing audio buffer: ${audioBuffer.length} bytes`);

            // Create a push stream (Azure will handle format detection)
            const pushStream = sdk.AudioInputStream.createPushStream();

            // Convert Buffer to ArrayBuffer
            const arrayBuffer = new ArrayBuffer(audioBuffer.length);
            const view = new Uint8Array(arrayBuffer);
            for (let i = 0; i < audioBuffer.length; i++) {
                view[i] = audioBuffer[i];
            }

            // Write the audio data
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
}


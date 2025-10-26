
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- NEW IMPORT
import { ChatModule } from './chat/chat.module'; // Assuming you have this module

@Module({
  imports: [
    // Configure ConfigModule to load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere
      envFilePath: '.env', // Assumes .env is in the api/ directory
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
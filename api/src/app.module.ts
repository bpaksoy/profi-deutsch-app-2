
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { ChatModule } from './chat/chat.module'; 
import { PhrasebookModule } from './phrasebook/phrasebook.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    // Configure ConfigModule to load environment variables
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    ChatModule,
    PhrasebookModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
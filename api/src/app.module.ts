
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { PhrasebookModule } from './phrasebook/phrasebook.module';
import { ProgressModule } from './progress/progress.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [
    // Configure ConfigModule to load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['api/.env', '.env'],
    }),
    AuthModule,
    ChatModule,
    PhrasebookModule,
    ProgressModule,
    PrismaModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
// api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1. Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // 2. Set up Global Prefixes and Security (OPTIONAL BUT RECOMMENDED)
  
  // CORS Configuration: Essential for allowing your Next.js frontend (web/) to talk to the backend (api/)
  // In a production environment, you would restrict 'origin' to your frontend URL.
  app.enableCors({
    origin: 'http://localhost:3001', // Example: Assuming Next.js runs on 3001
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global Prefix: Helps separate the API from the frontend in deployment
  // If you uncomment this, your TTS endpoint would be accessed at: http://localhost:3000/api/chat/tts
  // app.setGlobalPrefix('api');

  // 3. Start the server
  // Note: The default port for NestJS is often 3000. 
  // Make sure this doesn't conflict with your Next.js app (often 3000 or 3001).
  const port = 8000; 
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
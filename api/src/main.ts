// api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as net from 'net';
import { execSync } from 'child_process';
import session from 'express-session';

async function freePort(port: number) {
  return new Promise<void>((resolve) => {
    const tester = net.createServer();

    tester.once('error', () => {
      // Port busy → will be handled by killIfBusy
      resolve();
    });

    tester.once('listening', () => {
      // Port was free → close and continue
      tester.close(() => resolve());
    });

    tester.listen(port);
  });
}

async function killIfBusy(port: number) {
  try {
    const pid = execSync(`lsof -ti :${port}`).toString().trim();

    if (pid) {
      console.log(`[Nest] Port ${port} is busy → Killing process ${pid}...`);
      execSync(`kill -9 ${pid}`);
    }
  } catch {
    // No process found OR kill failed — ignore
  }
}

async function bootstrap() {
  const port = 8000;

  // PREVENT EADDRINUSE BEFORE STARTUP
  await freePort(port);
  await killIfBusy(port);

  // Create the NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your Next.js frontend
  // Enable CORS for your Next.js frontend
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow any localhost origin
      if (origin.match(/^http:\/\/localhost:\d+$/)) {
        return callback(null, true);
      }

      // Block others
      callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session({
      secret: 'your-secret-key-change-this-in-production',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

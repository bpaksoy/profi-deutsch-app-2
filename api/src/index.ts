// Firebase Functions Entry Point
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { AppModule } from './app.module';
import session from 'express-session';

// Create the NestJS app for serverless
const createNestServer = async () => {
  const expressApp = express();
  
  // Apply middleware BEFORE creating NestJS app
  // Body parsers for JSON and URL-encoded
  expressApp.use(express.json({ limit: '10mb' }));
  expressApp.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Session configuration
  expressApp.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    })
  );
  
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  // Set Global Prefix to /api
  app.setGlobalPrefix('api');

  // Enable CORS for production
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow any localhost origin
      if (origin.match(/^http:\/\/localhost:\d+$/)) {
        return callback(null, true);
      }

      // Allow your production firebase domains
      if (
        origin.match(/^https:\/\/sigsag-6055d\.web\.app$/) ||
        origin.match(/^https:\/\/sigsag-6055d\.firebaseapp\.com$/) ||
        origin.includes('profi-deutsch-app')
      ) {
        return callback(null, true);
      }

      // Block others
      callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init();
  return expressApp;
};

// Cache the Express app instance
let cachedApp: express.Express | null = null;

// Export the Firebase Function
export const api = onRequest(
  {
    timeoutSeconds: 300,
    memory: '1GiB',
    maxInstances: 10,
    invoker: 'public',
  },
  async (request, response) => {
    if (!cachedApp) {
      cachedApp = await createNestServer();
    }
    cachedApp(request, response);
  }
);

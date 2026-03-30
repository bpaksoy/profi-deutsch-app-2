# Profi-Deutsch App - Architecture & Deployment Notes

## Stack
- **Backend**: NestJS 10 on Firebase Functions v2 (Cloud Run), Node.js 20
- **Frontend**: Next.js 14.2.16 on Firebase Hosting
- **Database**: Supabase PostgreSQL via Prisma ORM 4.16.2
- **Auth**: Firebase Authentication (Google provider)
- **AI**: Google Gemini API (gemini-2.5-flash) for conversational responses, with streaming SSE
- **Speech**: Azure Speech Services (germanywestcentral, de-DE) for STT + TTS
- **TTS Voice**: de-DE-KatjaNeural (48kHz MP3)

## Deployment
- Firebase project: `sigsag-6055d`
- API URL: `https://api-prbzn5geoa-uc.a.run.app`
- Frontend URL: `https://sigsag-6055d.web.app`
- Deploy API: `firebase deploy --only functions:api`
- Deploy frontend: `cd web && npm run build && firebase deploy --only hosting`
- Deploy both: `firebase deploy`

## Key Files
- `api/src/index.ts` — Firebase Functions entry point (NOT main.ts in production)
- `api/src/main.ts` — Local development only
- `api/src/chat/chat.controller.ts` — Chat endpoints (text, STT, TTS, conversations)
- `api/src/chat/azure-speech.service.ts` — Azure Speech SDK transcription
- `api/src/chat/chat.service.ts` — TTS generation
- `api/src/chat/rag.service.ts` — Gemini AI responses
- `web/src/app/chat/ChatInterface.tsx` — Chat page with voice input
- `web/src/components/VoiceAssistant.tsx` — Dashboard voice assistant (Flo)
- `web/src/components/AssistantModal.tsx` — Dashboard text chat agent (Lern-Buddy)
- `web/next.config.mjs` — API URL configuration (build-time env vars)

## Critical: Firebase Functions + File Uploads
**Firebase Functions v2 pre-reads the entire request body into `request.rawBody`.**
This means the request stream is consumed BEFORE Express/multer can read it.
**Multipart FormData uploads DO NOT WORK with Firebase Functions.**

### Solution: Base64 JSON Upload
Instead of multipart FormData, audio is sent as base64-encoded JSON:
- Frontend converts WAV blob → base64 string → `{ audioBase64: "...", conversationId: "..." }`
- Backend decodes: `Buffer.from(body.audioBase64, 'base64')`
- Sent as `Content-Type: application/json` (works perfectly with Firebase Functions)

### Audio Pipeline (Working)
1. Browser MediaRecorder captures WebM audio
2. Web Audio API (OfflineAudioContext) resamples to 16kHz mono
3. Manual WAV encoder creates proper RIFF/PCM header
4. WAV blob → base64 string → JSON POST to /api/chat/stt
5. Backend decodes base64 → Buffer → Azure Speech SDK transcribes (de-DE)
6. Gemini generates German response
7. Azure TTS generates audio (de-DE-KatjaNeural)
8. Response: { transcript, responseText, audioBase64, conversationId }

## Middleware Order in index.ts
Middleware must be applied to expressApp BEFORE NestFactory.create():
```js
expressApp.use(express.json({ limit: '10mb' }));
expressApp.use(express.urlencoded({ limit: '10mb', extended: true }));
expressApp.use(session({...}));
// THEN create NestJS app with ExpressAdapter
```

## Environment Variables
- Firebase secrets for production (set via `firebase functions:secrets:set`)
- `web/next.config.mjs` hardcodes `NEXT_PUBLIC_API_BASE_URL` for build-time
- API prefix is `/api` (set via `app.setGlobalPrefix('api')`)

## SSE Streaming (Text Chat)
The `/chat/text` endpoint uses Server-Sent Events for real-time token streaming:
- Backend: `rag.service.ts` → `streamResponse()` async generator calls Gemini's `streamGenerateContent?alt=sse` endpoint
- Controller sets headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `X-Accel-Buffering: no`
- Each chunk sent as: `data: {"type":"chunk","content":"..."}\n\n`
- Final event: `data: {"type":"done","conversationId":"...","fullText":"..."}\n\n`
- DB writes (save message + update conversation) are fire-and-forget (`Promise.all([...]).catch()`)
- Frontend (`ChatInterface.tsx`) reads stream via `response.body.getReader()`, progressively updates UI
- TTS is decoupled — fetched separately via `fetchAndPlayTts()` after text completes

## Gemini Model Configuration
- **Primary model**: `gemini-2.5-flash`
- **Fallback model**: `gemini-2.0-flash-lite`
- **Retry logic**: 2 attempts per model, 3s wait on 429 (rate limit), then falls through to next model
- **maxOutputTokens**: 500
- **Conversation history**: Limited to last 10 messages
- **⚠️ Deprecated models**: `gemini-1.5-flash` returns 404 (removed). `gemini-2.0-flash` hits 429 on free tier (quota limit: 0).

## German-Only Prompts
All system prompts explicitly enforce German-only responses in 3 locations:
- `rag.service.ts` (streaming + non-streaming): "Antworte AUSSCHLIESSLICH auf Deutsch. Niemals auf Englisch."
- `assistant-service.ts` (dashboard agent): Same enforcement
- Includes explicit example: if user writes English → respond in German explaining this is a German course

## Avatar
- Flo's avatar: `web/public/flo-avatar.svg` (custom DiceBear fun-emoji SVG — yellow face with heart eyes)
- Referenced in `web/src/app/chat/page.tsx` (`AI_AVATAR = "/flo-avatar.svg"`)
- Fallback in `web/src/components/ChatMessage.tsx`

## Security
- **No hardcoded API keys** — `web/src/lib/firebase.ts` uses `process.env.NEXT_PUBLIC_FIREBASE_*` only
- `.gitignore` excludes: `.env.*`, `*.env.local`, `sigsag_status.md`, `FIREBASE_DEPLOYMENT.md`
- Git history was scrubbed with `git-filter-repo` to remove previously exposed secrets
- Firebase config vars set in `web/.env.local` (not tracked in git)

## Lessons Learned
1. Cloud Functions CANNOT use system binaries (ffmpeg) — use SDK-native capabilities
2. Azure Speech SDK works with WAV (16kHz, 16-bit, mono PCM) via createPushStream()
3. Browser MediaRecorder produces platform-dependent sample rates — must resample
4. Next.js build-time env vars in next.config.mjs override runtime .env files
5. NestJS `rawBody: true` option also breaks multipart (consumes stream)
6. Dashboard AssistantModal uses `NEXT_PUBLIC_API_BASE_URL` (not `API_BASE_URL`)
7. All API calls need auth header: `Authorization: Bearer ${token}`
8. Gemini free tier may have 0 quota for certain models — always have a fallback model
9. SSE streaming dramatically improves perceived latency vs waiting for full response
10. Decoupling TTS from text response prevents blocking the text stream

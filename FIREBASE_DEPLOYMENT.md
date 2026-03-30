# Firebase Deployment Guide

## Prerequisites

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Install dependencies**:
   ```bash
   cd api && npm install
   cd ../web && npm install
   ```

## Environment Variables Setup

### Set Firebase Secrets

Firebase Functions doesn't use `.env` files in production. You need to set secrets using the Firebase CLI:

```bash
# Set required secrets
firebase functions:secrets:set GEMINI_API_KEY
firebase functions:secrets:set DATABASE_URL
firebase functions:secrets:set AZURE_SPEECH_KEY
firebase functions:secrets:set AZURE_SPEECH_REGION
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_CLASSIC_PRICE_ID
firebase functions:secrets:set STRIPE_PRO_PRICE_ID
firebase functions:secrets:set STRIPE_ULTIMATE_PRICE_ID
firebase functions:secrets:set SESSION_SECRET

# Set as environment config (non-secret values)
firebase functions:config:set \
  frontend.url="https://sigsag-6055d.web.app" \
  google.project_id="sigsag-6055d"
```

### Access secrets in code

The secrets are automatically available via `process.env` when using the ConfigService:

```typescript
this.configService.get<string>('GEMINI_API_KEY')
```

## Prisma Setup

### 1. Generate Prisma Client

Prisma client is automatically generated during deployment via the `postinstall` script in `package.json`.

For local development:
```bash
cd api
npx prisma generate
```

### 2. Run Migrations

**Important:** Firebase Functions doesn't support running migrations automatically. You need to:

**Option A: Use Prisma Data Platform (Recommended)**
- Set up migrations on Prisma Cloud
- Run migrations before deployment

**Option B: Run migrations from local machine**
```bash
cd api
npx prisma migrate deploy
```

**Option C: Use a separate Cloud Run service for migrations**
- Create a dedicated service that runs migrations on startup

## Deployment Steps

### 1. Build the API
```bash
cd api
npm run build
```

### 2. Deploy to Firebase

**Deploy everything (functions + hosting):**
```bash
firebase deploy
```

**Deploy only functions:**
```bash
firebase deploy --only functions
```

**Deploy only hosting:**
```bash
firebase deploy --only hosting
```

### 3. View Logs

Monitor your function logs:
```bash
firebase functions:log
```

Or in real-time:
```bash
firebase functions:log --only api
```

## Common Issues & Solutions

### Issue 1: "Cannot find module" error

**Cause:** Missing dependencies or incorrect build.

**Solution:**
```bash
cd api
rm -rf node_modules package-lock.json
npm install
npm run build
firebase deploy --only functions
```

### Issue 2: "Prisma Client not initialized"

**Cause:** Prisma client not generated for the correct platform.

**Solution:**
Ensure `postinstall` script is in `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Issue 3: "API Key undefined"

**Cause:** Environment variables not set in Firebase.

**Solution:**
Check your secrets:
```bash
firebase functions:secrets:access GEMINI_API_KEY
```

Set missing secrets:
```bash
firebase functions:secrets:set GEMINI_API_KEY
```

### Issue 4: CORS errors from frontend

**Cause:** Frontend URL not whitelisted in CORS configuration.

**Solution:**
Update [api/src/index.ts](api/src/index.ts#L21-L42) to include your production URL.

### Issue 5: Cold start timeout

**Cause:** Firebase Functions have cold starts, and NestJS initialization can be slow.

**Solution:**
The function is configured with increased timeout and memory in [api/src/index.ts](api/src/index.ts#L71-L74):
```typescript
export const api = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '1GB',
  })
```

You can adjust these values if needed.

## Local Development

For local development, use the traditional method:

```bash
cd api
npm run start:dev
```

This will run the NestJS server on port 8080 (or port specified in `process.env.PORT`).

## Testing Firebase Functions Locally

Use Firebase emulators:

```bash
firebase emulators:start
```

This will start:
- Functions emulator on http://localhost:5001
- Hosting emulator on http://localhost:5000

## Production Checklist

Before deploying to production:

- [ ] All secrets are set in Firebase (`firebase functions:secrets:list`)
- [ ] Database migrations are run
- [ ] Prisma schema matches production database
- [ ] Frontend URL is updated in CORS configuration
- [ ] Stripe webhook endpoints are configured
- [ ] SESSION_SECRET is set to a secure random string
- [ ] Test all endpoints using the emulator

## Monitoring

### View Function Logs
```bash
firebase functions:log
```

### Firebase Console
Visit [Firebase Console](https://console.firebase.google.com/project/sigsag-6055d/functions) to:
- Monitor function executions
- View error rates
- Check memory/CPU usage
- Set up alerts

## Rollback

If deployment fails:
```bash
firebase functions:delete api
firebase deploy --only functions
```

## Cost Optimization

Firebase Functions pricing is based on:
- Number of invocations
- Compute time
- Memory allocation

To optimize costs:
1. Reduce memory allocation if possible (default is 1GB)
2. Optimize cold start time
3. Use caching where appropriate
4. Consider Firebase hosting rewrites for static content

## Support

For Firebase-specific issues, check:
- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [NestJS on Serverless](https://docs.nestjs.com/faq/serverless)

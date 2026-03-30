# Sigsag Architecture & Persistent Status Tracker

This document serves as the primary reference for Sigsag's production architecture, verified configurations, and historical fixes to ensure consistency between the AI agent and the user.

## 🚀 Current Production Architecture

| Component | Technology | Live URL / Endpoint |
| :--- | :--- | :--- |
| **Frontend** | Next.js (Firebase Frameworks) | [sigsag-6055d.web.app](https://sigsag-6055d.web.app) |
| **Backend API** | NestJS (Cloud Run) | [sigsag-api-prbzn5geoa-uc.a.run.app/api](https://sigsag-api-prbzn5geoa-uc.a.run.app/api) |
| **Authentication** | Firebase Auth | Google Sign-In Enabled |
| **Database** | Supabase (PostgreSQL) | Managed Connection |
| **AI (Flo)** | Google Gemini + Azure TTS | germanywestcentral |

---

## 🔑 Verified environment variables (Production)

### Backend (`sigsag-api`)
*   `DATABASE_URL`: Verified (Supabase)
*   `FRONTEND_URL`: `https://sigsag-6055d.web.app`
*   `GEMINI_API_KEY`: Verified Live
*   `AZURE_SPEECH_KEY`: Verified Live
*   `PORT`: `8080` (Must be strictly enforced)

### Frontend (`ssrsigsag6055d`)
*   `NEXT_PUBLIC_API_BASE_URL`: `https://sigsag-api-prbzn5geoa-uc.a.run.app/api`
*   `NEXT_PUBLIC_FIREBASE_API_KEY`: `REDACTED_FIREBASE_API_KEY`
*   `NEXT_PUBLIC_FIREBASE_APP_ID`: `REDACTED_FIREBASE_APP_ID`

---

## 🛠️ Critical Decisions & Fixes

### 1. Authentication Strategy
*   **Decision**: Fully moved from Clerk to **Firebase Auth**.
*   **Reason**: Bypass redirect and handshake loops caused by Clerk's dev-instance constraints.
*   **Infrastructure**: Frontend uses `signInWithPopup`. Backend uses `FirebaseAuthGuard`.

### 2. The "Ghost Config" Problem
*   **Fix**: Manually deleted old Cloud Run revisions that were caching the "1032406816801" API URL.
*   **Outcome**: All frontend traffic is now pinned to the "prbzn5geoa" endpoint.

### 3. Voice & Chat Failure ("Oje" / "Transcription failed")
*   **Cause**: Auth token mismatch. If login fails or uses old keys, the API rejects the request.
*   **Current Status**: Working one time, but slow. Requires optimization of the Azure TTS piping.

---

## 📝 Ongoing Tasks
- [ ] Stabilize Firebase production domain mapping.
- [ ] Optimize Flo's response time (latency).
- [ ] Verify Chat persistent history (Prisma).

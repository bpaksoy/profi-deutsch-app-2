# Sigsag - Your AI German Tutor for Professionals

Welcome to **Sigsag**, an AI-powered platform for learning German with a focus on professional everyday life. Sigsag combines state-of-the-art language models (Gemini), Retrieval-Augmented Generation (RAG), and speech technologies to provide an immersive B2-level learning experience.

---

## 🚀 Core Features

-   **AI Speech Training:** Practice free speaking with "Flo", your AI learning buddy, specialized in professional scenarios.
-   **RAG-Powered Knowledge:** The AI agent uses a dedicated knowledge base for correct German grammar, business etiquette, and B2-specific vocabulary.
-   **Professional Phrasebook:** Save important phrases directly from your conversations and categorize them (Meetings, Emails, Phone calls).
-   **Learning Dashboard:** Track your progress, collected XP, and mastered words.
-   **Real-time Feedback:** Get instant feedback on your pronunciation and grammar (integrated via Azure Speech & Gemini).

## 🛠 Technologies

### Frontend (`web/`)
-   **Framework:** Next.js 14 (App Router)
-   **Styling:** Tailwind CSS & Vanilla CSS Hybrid
-   **Authentication:** Clerk (Social Login & Account Management)
-   **State & APIs:** React Hooks, Fetch API with JWT Integration

### Backend (`api/`)
-   **Framework:** NestJS
-   **Database:** PostgreSQL & Prisma ORM
-   **AI & LLM:** Google Gemini API (RAG-based)
-   **Speech-to-Text & TTS:** Microsoft Azure Speech Services
-   **Authentication:** @clerk/backend (JWT Verification & User Sync)
-   **Knowledge Base:** Integrated vector storage (Prisma-based) for RAG

## 🏗 Project Structure

```bash
profi-deutsch-app/
├── web/              # Next.js Frontend
│   ├── src/app/      # Pages & Routing (Clerk protected)
│   ├── src/components/ # Reusable UI components
│   └── next.config.mjs # Redirects & Config
└── api/              # NestJS Backend
    ├── prisma/       # Schema & Seeding (Knowledge Base)
    ├── src/auth/     # Clerk Authentication Guard & Service
    ├── src/chat/     # RAG Service, Chat Logic, Speech Integration
    ├── src/phrasebook/ # Phrasebook management
    └── src/progress/ # Progress tracker
```

## 🏁 Getting Started

### Prerequisites
-   Node.js (v18+)
-   PostgreSQL (local or Docker)
-   API Keys for: Clerk, Gemini (Google AI), Azure Speech

### Installation

1.  **Clone the Repository**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env` in the root directory and a `.env.local` in `web/` (see below).

4.  **Set up the database:**
    ```bash
    cd api
    npx prisma generate
    npx prisma db push
    npx prisma db seed # Categories & basic data
    npx ts-node prisma/seed-knowledge.ts # Load knowledge base for RAG
    ```

5.  **Run the application:**
    -   Backend: `cd api && npm run start:dev`
    -   Frontend: `cd web && npm run dev`

## 🔑 Environment Variables

### Backend (`api/.env`)
-   `DATABASE_URL`: PostgreSQL Connection String
-   `CLERK_SECRET_KEY`: Clerk Secret
-   `GEMINI_API_KEY`: API Key for Google Gemini
-   `AZURE_SPEECH_KEY`: Key for Azure Speech Services
-   `AZURE_SPEECH_REGION`: Azure Region (e.g., `westeurope`)

### Frontend (`web/.env.local`)
-   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk Public Key
-   `CLERK_SECRET_KEY`: Clerk Secret
-   `NEXT_PUBLIC_API_BASE_URL`: URL to Backend (default `http://localhost:8000`)

---

# Sigsag - Dein KI-Deutschlehrer für den Beruf

Willkommen bei **Sigsag**, deiner KI-gestützten Plattform zum Deutschlernen mit Fokus auf den Berufsalltag. Sigsag kombiniert modernste Sprachmodelle (Gemini), Retrieval-Augmented Generation (RAG) und Sprachtechnologien, um ein immersives Lernerlebnis auf B2-Niveau zu ermöglichen.

## 🚀 Kernfunktionen

-   **KI-Sprachtraining:** Übe freies Sprechen mit "Flo", deinem KI-Lern-Buddy, spezialisiert auf berufliche Szenarien.
-   **RAG-gestütztes Wissen:** Der KI-Agent nutzt eine dedizierte Wissensdatenbank für korrekte deutsche Grammatik, Business-Etikette und B2-spezifisches Vokabular.
-   **Professionelles Phrasenbuch:** Speichere wichtige Redemittel direkt aus deinen Gesprächen und kategorisiere sie (Meetings, E-Mails, Telefonate).
-   **Lern-Dashboard:** Verfolge deinen Fortschritt, gesammelte XP und gemeisterte Wörter.
-   **Echtzeit-Feedback:** Erhalte sofortige Rückmeldungen zu deiner Aussprache und Grammatik (integriert via Azure Speech & Gemini).

## 🛠 Technologien

### Frontend (`web/`)
-   **Framework:** Next.js 14 (App Router)
-   **Styling:** Tailwind CSS & Vanilla CSS Hybrid
-   **Authentifizierung:** Clerk (Social Login & Account Management)
-   **State & APIs:** React Hooks, Fetch API mit JWT Integration

### Backend (`api/`)
-   **Framework:** NestJS
-   **Datenbank:** PostgreSQL & Prisma ORM
-   **KI & LLM:** Google Gemini API (RAG-basiert)
-   **Speech-to-Text & TTS:** Microsoft Azure Speech Services
-   **Authentifizierung:** @clerk/backend (JWT Verification & User Sync)
-   **Wissensbasis:** Integrierter Vektorspeicher (Prisma-basiert) für RAG

## 🏗 Projektstruktur

```bash
profi-deutsch-app/
├── web/              # Next.js Frontend
│   ├── src/app/      # Pages & Routing (Clerk-geschützt)
│   ├── src/components/ # Wiederverwendbare UI-Komponenten
│   └── next.config.mjs # Redirects & Config
└── api/              # NestJS Backend
    ├── prisma/       # Schema & Seeding (Knowledge Base)
    ├── src/auth/     # Clerk Authentication Guard & Service
    ├── src/chat/     # RAG Service, Chat Logic, Speech Integration
    ├── src/phrasebook/ # Redemittel Verwaltung
    └── src/progress/ # Fortschritts-Tracker
```

## 🏁 Erste Schritte

### Voraussetzungen
-   Node.js (v18+)
-   PostgreSQL (lokal oder Docker)
-   API Keys für: Clerk, Gemini (Google AI), Azure Speech

### Installation

1.  **Repository klonen**
2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```
3.  **Umgebungsvariablen konfigurieren:**
    Erstelle eine `.env` im Stammverzeichnis und eine `.env.local` in `web/` (siehe unten).

4.  **Datenbank einrichten:**
    ```bash
    cd api
    npx prisma generate
    npx prisma db push
    npx prisma db seed # Kategorien & Basis-Daten
    npx ts-node prisma/seed-knowledge.ts # Wissensbasis für RAG laden
    ```

5.  **Starten:**
    -   Backend: `cd api && npm run start:dev`
    -   Frontend: `cd web && npm run dev`

## 🔑 Umgebungsvariablen

### Backend (`api/.env`)
-   `DATABASE_URL`: PostgreSQL Connection String
-   `CLERK_SECRET_KEY`: Clerk Secret
-   `GEMINI_API_KEY`: API Key für Google Gemini
-   `AZURE_SPEECH_KEY`: Schlüssel für Azure Speech Services
-   `AZURE_SPEECH_REGION`: Region für Azure (z.B. `westeurope`)

### Frontend (`web/.env.local`)
-   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk Public Key
-   `CLERK_SECRET_KEY`: Clerk Secret
-   `NEXT_PUBLIC_API_BASE_URL`: URL zum Backend (Standard `http://localhost:8000`)
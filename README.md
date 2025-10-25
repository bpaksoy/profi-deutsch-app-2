# ProfiDeutsch App

Welcome to ProfiDeutsch, your AI-powered professional German tutor for internships in Germany! This monorepo contains both the frontend (Next.js/React) and the backend (NestJS) for the application.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Frontend Setup](#frontend-setup)
    -   [Backend Setup](#backend-setup)
-   [Environment Variables](#environment-variables)
-   [AI Agent Integration (ElevenLabs)](#ai-agent-integration-elevenlabs)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Professional Phrasebook:** Browse and learn key German phrases for workplace scenarios.
-   **AI Speaking Practice:** Engage in conversational practice with an AI agent for various professional situations (e.g., meetings, job interviews).
-   **Progress Tracking:** Monitor your learning progress, including fluency, grammar, and pronunciation.
-   **Mobile-Responsive Design:** Seamless experience across desktop and mobile devices.
-   **Dark Mode:** User-friendly interface with light and dark themes.

## Technologies Used

### Frontend (`web/`)

-   **React:** A JavaScript library for building user interfaces.
-   **Next.js:** A React framework for building full-stack web applications.
-   **TypeScript:** Strongly typed programming language that builds on JavaScript.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

### Backend (`api/`)

-   **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
-   **TypeScript:** (Same as frontend)
-   **ElevenLabs API:** For Text-to-Speech (TTS) and potentially Speech-to-Text (STT) for the AI agent.
-   **Your Gemini LLM:** (Integration will be done via NestJS backend)
-   **Other APIs (TBD):** For Speech-to-Text (e.g., Google Cloud Speech-to-Text) if ElevenLabs STT is not sufficient for German.

## Project Structure
profi-deutsch-app/
├── README.md
├── package.json
├── web/ # Next.js (React) Frontend
│ ├── public/
│ ├── src/
│ │ ├── app/ # Next.js App Router structure
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx
│ │ │ ├── dashboard/
│ │ │ │ └── page.tsx
│ │ │ ├── phrases/
│ │ │ │ └── page.tsx
│ │ │ ├── chat/
│ │ │ │ └── page.tsx
│ │ ├── components/
│ │ │ ├── ui/
│ │ │ ├── Layout.tsx
│ │ │ ├── PhraseCard.tsx
│ │ │ ├── ChatMessage.tsx
│ │ │ └── ...
│ │ ├── styles/
│ │ │ └── global.css
│ │ ├── lib/
│ │ └── types/
│ ├── tailwind.config.ts
│ ├── tsconfig.json
│ ├── next.config.mjs
│ └── package.json
└── api/ # NestJS Backend
├── src/
│ ├── main.ts
│ ├── app.controller.ts
│ ├── app.service.ts
│ ├── chat/
│ │ ├── chat.controller.ts
│ │ ├── chat.service.ts
│ │ └── chat.module.ts
│ ├── auth/
│ │ └── ...
│ └── common/
├── tsconfig.json
├── nest-cli.json
└── package.json
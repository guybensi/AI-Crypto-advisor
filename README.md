# AI Crypto Advisor (Java + React + SQLite)

This repository contains a full-stack skeleton for the **AI Crypto Advisor** take-home:
- **Backend**: Java (Spring Boot), REST APIs, JWT-ready auth, SQLite (via JPA/Hibernate).
- **Frontend**: React + TypeScript, clean component structure, fetch layer, and pages (Login, Signup, Onboarding, Dashboard).
- **OOP-first**: Clear domain models, service interfaces, and layered architecture for easier future changes.
- **Comments**: All code comments are in English for readability.

> This is a working baseline you can deploy and extend. External API calls (CoinGecko, CryptoPanic, LLM, memes) are abstracted behind service interfaces so you can switch implementations easily (e.g., mock → real).

## Quick Start

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
The backend runs at `http://localhost:8080` and uses an SQLite DB under `./data/crypto.db`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend runs at `http://localhost:5173` (Vite default) and proxies API requests to `http://localhost:8080` if you configure a proxy.

## Deploy
- **Frontend**: Vercel/Netlify (static).
- **Backend + DB**: Render/Railway (free tier). Supply `JAVA_OPTS` memory flags if needed.
- Ensure `spring.datasource.url` points to a writable path on your host.

## Structure
```
backend/   # Spring Boot project
frontend/  # React + TS project
```

## Notes
- Replace stub providers (`*ServiceImpl`) with real API integrations (CoinGecko, CryptoPanic, LLM) as needed.
- JWT secret in `application.properties` is a placeholder; replace for production.
- All code comments are in English.

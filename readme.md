# TalkLife MVP

TalkLife is an early MVP for language learning through spoken or typed input. The first product loop is:

1. Speak or type a sentence.
2. Translate it.
3. Extract useful vocabulary.
4. Save selected words as study cards.
5. Review due cards with spaced repetition.

## Current Status

Implemented:

- React and TypeScript frontend with speech input support.
- Spring Boot backend with a translation API.
- PostgreSQL database via Docker Compose.
- Translation request and response DTOs.
- Ollama-backed translation service.
- Backend validation and structured API error responses.
- Safe backend logs for translation requests without logging spoken text.
- Frontend API error handling and dev-only debug logging.
- Configurable frontend API URL with `VITE_API_BASE_URL`.
- Configurable backend CORS origins with `app.cors.allowed-origins`.

Not implemented yet:

- Vocabulary extraction.
- Study card database and review flow.
- Grammar lessons.
- Authentication and user profiles.
- Progress tracking.

## Tech Stack

- Frontend: React, TypeScript, Vite.
- Backend: Java 21, Spring Boot.
- Database: PostgreSQL.
- Local orchestration: Docker Compose.
- Planned AI integration: Ollama locally first, OpenAI later if needed.

## Local Development

Start infrastructure and services:

```sh
make up
```

Frontend only:

```sh
cd language-learning-app/frontend
npm install
npm run dev
```

Backend only:

```sh
cd language-learning-app/backend
./mvnw spring-boot:run
```

## Configuration

Frontend:

```sh
VITE_API_BASE_URL=http://localhost:8080
```

Backend:

```properties
app.cors.allowed-origins=http://localhost:5173,http://127.0.0.1:5173
app.ai.ollama.base-url=http://localhost:11434
app.ai.ollama.model=translategemma:latest
```

Docker Compose overrides the backend datasource URL so the backend can reach the `postgres` service inside Docker.
It also sets the Ollama base URL to `http://ollama:11434`. To use a different local model, set `OLLAMA_MODEL` before starting Docker Compose:

```sh
OLLAMA_MODEL=qwen2.5:7b make up
```

## Quality Checks

Frontend:

```sh
cd language-learning-app/frontend
npm run lint
npm run build
```

Backend:

```sh
cd language-learning-app/backend
./mvnw test
```

## Next Milestones

Phase 3:

- Add a study card database model with `dueDate`, `interval`, `ease`, and `reviewCount`.
- Add endpoints for creating cards, listing due cards, and reviewing cards.

Phase 4:

- Add vocabulary extraction from translated sentences.
- Let users choose which words become study cards.

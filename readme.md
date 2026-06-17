Project Description

AI-Powered Language Learning App

This project is a language learning application originally inspired by a personal goal: helping my wife learn German while I learn Chinese. The app focuses on interactive, AI-assisted language acquisition through realistic conversations, personalized exercises, and adaptive learning paths.

The frontend is built with TypeScript, providing a modern and responsive user experience. The backend is developed using Java and Spring Boot, exposing REST APIs, managing user progress, authentication, and learning content. AI features are integrated to enable conversational practice, grammar correction, vocabulary training, pronunciation feedback, and personalized lesson generation.

Key features include:

* AI-powered conversation practice
* Personalized vocabulary and grammar exercises
* Progress tracking and learning analytics
* Support for multiple languages, including German and Chinese
* Adaptive difficulty based on user performance
* User authentication and profile management
* Responsive web interface built with TypeScript

The goal of the project is to create a more engaging and effective language learning experience than traditional flashcard-based apps by leveraging modern AI technologies and interactive learning methods.

Tech Stack

* Frontend: TypeScript (Angular/React/etc.)
* Backend: Java, Spring Boot
* Database: (e.g. PostgreSQL/MySQL)
* Authentication: Spring Security, JWT
* AI Integration: OpenAI API / LLM services
* Deployment: Docker, Cloud Hosting





Frontend: Next.js + TypeScript

Spring Boot

AI worker: Python + FastAPI

Database: Supabase Postgres + pgvector

Queue/cache: Redis

Local dev: Docker Compose

CI/CD: GitHub Actions

Deployment: Fly.io or Railway first


Next.js

   ↓

Spring Boot

   ↓

PostgreSQL

Python AI Service

   ↓

Ollama / OpenAI

Redis

   ↓

queues/cache

Docker Compose

   ↓

orchestrates everything






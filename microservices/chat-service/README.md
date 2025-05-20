# Chat Service

## Purpose
Provides real-time chat for live streams, with scaling and moderation support.

## Stack
- Node.js (Socket.io)
- Redis (pub/sub)
- MongoDB (chat logs)
- RabbitMQ (optional, for moderation/audit)

## Quickstart
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Environment variables:
   - Copy `.env.example` to `.env` and fill in your configuration.

## Implementation Steps
See `DEVELOPMENT_PLAN.md` for a detailed plan and architecture. 
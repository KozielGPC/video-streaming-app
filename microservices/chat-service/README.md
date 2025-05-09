# Chat Service

## Purpose
Provides real-time chat for live streams, with scaling and moderation support.

## Stack
- Node.js (Socket.io) or Go
- Redis (pub/sub)
- RabbitMQ

## Implementation Steps
1. Scaffold a Node.js or Go app.
2. Implement a WebSocket server (Socket.io/ws).
3. Use Redis pub/sub for scaling across instances.
4. Store chat logs (optional, for moderation/audit).
5. Integrate moderation tools (e.g., keyword filtering, user bans).
6. Add Prometheus metrics and centralized logging.
7. Add Dockerfile for containerization.
8. Add to `infra/Tiltfile` for local orchestration.
9. Add health check endpoints. 
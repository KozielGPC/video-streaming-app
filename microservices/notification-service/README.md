# Notification Service

## Purpose
Sends email, push, and in-app notifications to users based on events.

## Stack
- Ruby (Rails) or Go
- RabbitMQ
- Redis

## Implementation Steps
1. Scaffold a Ruby (Rails) or Go app.
2. Listen to events from RabbitMQ (e.g., new video, live stream started, chat mention).
3. Implement logic for sending email, push, and in-app notifications.
4. Store notification preferences in Redis or a database.
5. Add Prometheus metrics and centralized logging.
6. Add Dockerfile for containerization.
7. Add to `infra/Tiltfile` for local orchestration.
8. Add health check endpoints. 
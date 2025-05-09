# Microservices Overview

This folder contains all backend microservices for the Video Streaming Platform. Each service is independently developed, containerized, and communicates via REST/GraphQL APIs, RabbitMQ, and Redis.

## Microservices to Implement

- **user-service**: User authentication, profiles (Python/Go)
- **video-service**: Video upload, encoding, metadata, serving (Node.js/Python)
- **live-stream-service**: RTMP ingest, HLS/DASH output, live session management (Go/Python)
- **chat-service**: Real-time chat for streams (Node.js/Go)
- **notification-service**: Email, push, in-app notifications (Ruby/Go)
- **analytics-service**: Collects and exposes metrics (Python/Go)

---

## Implementation Guide for Each Microservice

### 1. User Service (`user-service`)
- **Purpose**: Handles authentication (JWT/OAuth), user registration, profiles
- **Stack**: FastAPI (Python) or Go, PostgreSQL, Redis, RabbitMQ
- **Steps:**
  1. Scaffold FastAPI or Go app
  2. Implement REST/GraphQL endpoints for auth, registration, profile CRUD
  3. Integrate JWT/OAuth
  4. Connect to PostgreSQL for user data
  5. Use Redis for session/cache
  6. Publish user events to RabbitMQ
  7. Add Prometheus metrics and logging
  8. Add Dockerfile

### 2. Video Service (`video-service`)
- **Purpose**: Handles video upload, encoding (FFmpeg), metadata, serving (HLS/DASH)
- **Stack**: Node.js/Express or Python, MongoDB, S3/Minio, RabbitMQ
- **Steps:**
  1. Scaffold Node.js or Python app
  2. Implement REST/GraphQL endpoints for upload, metadata, video listing
  3. Store video files in S3/Minio
  4. Store metadata in MongoDB
  5. Use RabbitMQ to queue encoding jobs (FFmpeg)
  6. Serve HLS/DASH playlists
  7. Add Prometheus metrics and logging
  8. Add Dockerfile

### 3. Live Stream Service (`live-stream-service`)
- **Purpose**: Handles RTMP ingest, live transcoding, HLS/DASH output, session management
- **Stack**: Go or Python, NGINX RTMP, Redis, RabbitMQ, S3/Minio
- **Steps:**
  1. Scaffold Go or Python app
  2. Integrate with NGINX RTMP for ingest
  3. Transcode to HLS/DASH (FFmpeg)
  4. Manage live session state in Redis
  5. Store live recordings in S3/Minio
  6. Publish stream events to RabbitMQ
  7. Add Prometheus metrics and logging
  8. Add Dockerfile

### 4. Chat Service (`chat-service`)
- **Purpose**: Real-time chat for live streams
- **Stack**: Node.js (Socket.io) or Go, Redis (pub/sub), RabbitMQ
- **Steps:**
  1. Scaffold Node.js or Go app
  2. Implement WebSocket server (Socket.io/ws)
  3. Use Redis pub/sub for scaling
  4. Store chat logs (optional)
  5. Integrate moderation tools
  6. Add Prometheus metrics and logging
  7. Add Dockerfile

### 5. Notification Service (`notification-service`)
- **Purpose**: Sends email, push, and in-app notifications
- **Stack**: Ruby (Rails) or Go, RabbitMQ, Redis
- **Steps:**
  1. Scaffold Ruby or Go app
  2. Listen to events from RabbitMQ
  3. Implement email, push, and in-app notification logic
  4. Store notification preferences in Redis or DB
  5. Add Prometheus metrics and logging
  6. Add Dockerfile

### 6. Analytics Service (`analytics-service`)
- **Purpose**: Collects, aggregates, and exposes metrics (views, engagement, etc.)
- **Stack**: Python (FastAPI) or Go, PostgreSQL/MongoDB, Prometheus
- **Steps:**
  1. Scaffold Python or Go app
  2. Collect events from RabbitMQ
  3. Store metrics in PostgreSQL/MongoDB
  4. Expose analytics via REST/GraphQL
  5. Add Prometheus metrics and logging
  6. Add Dockerfile

---

## General Notes
- All services should use environment variables for config
- Add health check endpoints
- Add to `infra/Tiltfile` for local orchestration
- Ensure all services are containerized (Docker)
- Add Prometheus metrics and centralized logging 
# Chat Service Development Plan

## Overview
The Chat Service provides real-time chat functionality for live streams, supporting horizontal scaling, moderation, and observability. It is designed to be robust, scalable, and easy to integrate with other microservices in the video-streaming-app ecosystem.

---

## Tech Stack
- **Backend Language:** Node.js (with Socket.io)
- **Real-time Communication:** WebSocket (Socket.io)
- **Message Brokering/Scaling:** Redis (pub/sub)
- **Queueing (optional, for moderation/audit):** RabbitMQ
- **Data Storage (for chat logs):** MongoDB
- **Containerization:** Docker
- **Orchestration:** Kubernetes (manifests in `infra/kubernetes/`)
- **Monitoring:** Prometheus
- **Logging:** Centralized logging (e.g., ELK stack, Loki, or similar)

---

## High-Level Architecture
```
[Client] <-> [Chat Service (WebSocket Server)] <-> [Redis Pub/Sub] <-> [Other Chat Service Instances]
                                              |
                                              v
                                        [RabbitMQ] (for moderation/audit)
                                              |
                                              v
                                    [Moderation Service / Storage]
                                              |
                                              v
                                         [MongoDB]
```
- **Clients** connect to the Chat Service via WebSocket.
- **Chat Service** instances communicate with each other via Redis pub/sub for horizontal scaling.
- **RabbitMQ** is used for moderation/audit workflows (optional).
- **MongoDB** stores chat logs for moderation/audit.
- **Moderation tools** can be integrated for filtering, bans, etc.

---

## Asynchronous Moderation Workflow with RabbitMQ

To enable scalable and robust moderation, the chat service uses RabbitMQ for asynchronous moderation and audit workflows. This allows messages to be analyzed and acted upon by separate services without blocking the real-time chat experience.

### Moderation Workflow Steps
1. **User Sends a Message**
   - The user sends a chat message to the chat server via WebSocket.
2. **Message is Broadcast to Clients**
   - The chat server immediately broadcasts the message to all connected clients for real-time experience.
3. **Message is Sent to Moderation Queue**
   - Simultaneously, the chat server publishes the message to a RabbitMQ queue (e.g., `moderation`).
4. **Moderation Service Analyzes the Message**
   - A separate moderation service consumes messages from the queue and analyzes them for violations (e.g., banned words, spam, abuse).
5. **If the Message is Bad:**
   - The moderation service publishes a delete/hide request to another queue (e.g., `moderation-actions`).
   - The chat server listens to this queue.
6. **Message is Deleted/Hidden**
   - Upon receiving a delete/hide request, the chat server removes the message from its database (if stored) and emits a `chat:delete` event to all clients, instructing them to hide or remove the message from the chat UI.
7. **Clients Hide the Message**
   - Clients receive the `chat:delete` event and remove the offending message from the chat window.

### Example Event Flow
```
User → [Chat Service] → All Clients (show message)
                ↓
         [RabbitMQ: moderation]
                ↓
      [Moderation Service] (detects violation)
                ↓
         [RabbitMQ: moderation-actions]
                ↓
        [Chat Service] → All Clients (hide/delete message)
```

### Benefits
- **Real-time experience:** Messages appear instantly.
- **Moderation is robust:** Even if moderation is slow, the chat isn't blocked.
- **Bad messages can be removed after the fact:** Users see them briefly, but they're quickly removed if flagged.

### Optional Enhancements
- **Shadow Banning:** Only the sender sees their message if banned.
- **Pre-moderation:** Delay broadcast until moderation approves (impacts real-time feel).
- **Audit Logging:** All moderation actions can be logged for compliance.

---

## Development Workflow
1. **Project Scaffold**
   - Initialize a Node.js project.
   - Set up basic folder structure: `src/`, `config/`, `tests/`, etc.

2. **WebSocket Server Implementation**
   - Implement a WebSocket server using Socket.io.
   - Handle client connections, disconnections, and message events.

3. **Scaling with Redis Pub/Sub**
   - Integrate Redis pub/sub to broadcast messages across multiple service instances.
   - Ensure messages sent from one instance are received by all others.

4. **Chat Log Storage**
   - Integrate MongoDB to store chat logs for moderation/audit.
   - Implement log writing on message receipt.

5. **Moderation Tools**
   - Implement keyword filtering (block/flag messages with banned words).
   - Add user ban functionality (in-memory or persistent in MongoDB).
   - (Optional) Use RabbitMQ to queue messages for asynchronous moderation.

6. **Observability**
   - Add Prometheus metrics (connections, messages sent/received, errors, etc.).
   - Integrate centralized logging (stdout, or log shipper).

7. **Containerization & Orchestration**
   - Write a Dockerfile for the service.
   - Add Kubernetes manifests for deployment, service, config, and health checks.
   - Update `infra/Tiltfile` for local development.

8. **Health Checks**
   - Implement `/healthz` and `/readyz` HTTP endpoints for liveness/readiness probes.

9. **Testing**
   - Write unit and integration tests for core logic (WebSocket, moderation, scaling).
   - (Optional) Add load testing scripts.

10. **Documentation**
    - Document API endpoints, message formats, and integration steps.

---

## How the App Works
- **User connects** to the chat server via WebSocket.
- **User sends a message**; the server:
  - Validates and optionally moderates the message.
  - Publishes the message to Redis, which broadcasts to all service instances.
  - Each instance relays the message to its connected clients.
  - Stores the message in MongoDB for audit/moderation.
- **Moderation** can be synchronous (inline) or asynchronous (via RabbitMQ).
- **Metrics and logs** are collected for monitoring and debugging.

---

## Example Folder Structure
```
chat-service/
├── src/
│   ├── server.js
│   ├── socket/
│   ├── moderation/
│   ├── redis/
│   ├── rabbitmq/
│   └── storage/
├── config/
├── tests/
├── Dockerfile
├── README.md
└── DEVELOPMENT_PLAN.md
```

---

## Next Steps
- Scaffold the Node.js project and set up the initial WebSocket server with Socket.io.
- Integrate Redis for scaling and MongoDB for chat log storage.
- Incrementally add features following the workflow above. 
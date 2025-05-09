# User Service

## Purpose
Handles authentication (JWT/OAuth), user registration, and profile management.

## Stack
- FastAPI (Python) or Go
- PostgreSQL
- Redis
- RabbitMQ

## Implementation Steps
1. Scaffold a FastAPI (Python) or Go app.
2. Implement REST/GraphQL endpoints for:
   - User registration
   - Authentication (JWT/OAuth)
   - Profile CRUD
3. Integrate JWT/OAuth for authentication.
4. Connect to PostgreSQL for user data storage.
5. Use Redis for session management and caching.
6. Publish user events (e.g., registration, login) to RabbitMQ.
7. Add Prometheus metrics and centralized logging.
8. Add Dockerfile for containerization.
9. Add to `infra/Tiltfile` for local orchestration.
10. Add health check endpoints. 
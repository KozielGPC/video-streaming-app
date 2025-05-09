# Analytics Service

## Purpose
Collects, aggregates, and exposes metrics (views, engagement, etc.) for the platform.

## Stack
- Python (FastAPI) or Go
- PostgreSQL or MongoDB
- Prometheus

## Implementation Steps
1. Scaffold a Python (FastAPI) or Go app.
2. Collect events from RabbitMQ (e.g., video views, stream starts, chat messages).
3. Store metrics in PostgreSQL or MongoDB.
4. Expose analytics data via REST/GraphQL endpoints.
5. Add Prometheus metrics and centralized logging.
6. Add Dockerfile for containerization.
7. Add to `infra/Tiltfile` for local orchestration.
8. Add health check endpoints. 
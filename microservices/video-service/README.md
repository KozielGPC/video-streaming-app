# Video Service

## Purpose
Handles video upload, encoding (FFmpeg), metadata management, and serving (HLS/DASH).

## Stack
- Node.js/Express or Python
- MongoDB
- S3/Minio
- RabbitMQ

## Implementation Steps
1. Scaffold a Node.js or Python app.
2. Implement REST/GraphQL endpoints for:
   - Video upload
   - Metadata management
   - Video listing
3. Store video files in S3/Minio.
4. Store video metadata in MongoDB.
5. Use RabbitMQ to queue encoding jobs (FFmpeg).
6. Serve HLS/DASH playlists and video segments.
7. Add Prometheus metrics and centralized logging.
8. Add Dockerfile for containerization.
9. Add to `infra/Tiltfile` for local orchestration.
10. Add health check endpoints. 
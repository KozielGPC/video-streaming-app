# Live Stream Service

## Purpose
Handles RTMP ingest, live transcoding, HLS/DASH output, and live session management.

## Stack
- Go or Python
- NGINX RTMP
- Redis
- RabbitMQ
- S3/Minio

## Implementation Steps
1. Scaffold a Go or Python app.
2. Integrate with NGINX RTMP for RTMP ingest.
3. Transcode incoming streams to HLS/DASH using FFmpeg.
4. Manage live session state in Redis.
5. Store live recordings in S3/Minio.
6. Publish stream events to RabbitMQ.
7. Add Prometheus metrics and centralized logging.
8. Add Dockerfile for containerization.
9. Add to `infra/Tiltfile` for local orchestration.
10. Add health check endpoints. 
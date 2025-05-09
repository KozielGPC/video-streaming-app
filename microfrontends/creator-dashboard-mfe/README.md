# Creator Dashboard Microfrontend (Next.js)

## Purpose
Allows creators to manage streams, videos, analytics, and settings in a unified dashboard.

## Stack
- Next.js (React, TypeScript)
- Module Federation (remote)
- TailwindCSS

## Setup
1. Scaffold the app:
   ```sh
   npx create-next-app creator-dashboard-mfe --typescript
   cd creator-dashboard-mfe
   ```
2. Set up Module Federation as a remote (see [Module Federation docs](https://module-federation.io/)).
3. Expose dashboard pages/components for consumption by the App Shell.
4. Integrate with Video, Live, Analytics, and Notification services via REST/GraphQL APIs.
5. Implement features:
   - Video upload and management
   - Stream management (start/stop, status)
   - Analytics views (views, engagement, revenue)
   - Notification settings
6. Style with TailwindCSS.
7. Add a Dockerfile for containerization.
8. Add to `infra/Tiltfile` for local orchestration.
9. Test integration with App Shell. 
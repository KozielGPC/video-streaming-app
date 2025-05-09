# Admin Microfrontend (Ruby on Rails)

## Purpose
Admin interface for user/content moderation and system monitoring.

## Stack
- Ruby on Rails (with React/Vue/Angular frontend via Webpacker)
- Module Federation (via web component or iframe, or static asset serving)
- TailwindCSS or framework's default

## Setup
1. Scaffold the app:
   ```sh
   rails new admin-mfe --webpack=react
   cd admin-mfe
   ```
   (You can use `--webpack=vue` or `--webpack=angular` for other frameworks)
2. Build the admin UI as a SPA or web component using your chosen frontend (React, Vue, or Angular).
3. Expose the admin UI as a remote for Module Federation, or embed via iframe/web component in the App Shell.
4. Integrate with User, Video, Live, Notification, and Analytics services via REST/GraphQL APIs.
5. Implement features:
   - User and content moderation tools
   - System dashboards (status, logs, metrics)
   - Admin notifications
6. Style with TailwindCSS or the framework's default styling.
7. Add a Dockerfile for containerization.
8. Add to `infra/Tiltfile` for local orchestration.
9. Test integration with App Shell. 
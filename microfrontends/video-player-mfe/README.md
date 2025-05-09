# Video Player Microfrontend (Angular.js)

## Purpose
Plays live streams and VODs, handles adaptive streaming (HLS/DASH), and integrates chat for interactive viewing.

## Stack
- Angular.js (Angular 2+)
- Module Federation (remote)
- SCSS or TailwindCSS
- video.js or similar for playback

## Setup
1. Scaffold the app:
   ```sh
   ng new video-player-mfe --routing --style=scss
   cd video-player-mfe
   ```
2. Set up Module Federation as a remote (see [Module Federation for Angular](https://nx.dev/module-federation/angular)).
3. Expose the VideoPlayer component for consumption by the App Shell.
4. Integrate video.js (or similar) for HLS/DASH playback.
5. Add props/config for video source URLs, stream type (live/VOD), and player options.
6. Embed chat (from Chat Service) as a component or iframe.
7. Style the player and chat with SCSS or TailwindCSS.
8. Add a Dockerfile for containerization.
9. Add to `infra/Tiltfile` for local orchestration.
10. Test integration with App Shell. 
# Auth Microfrontend (React.js)

## Purpose
Handles user authentication, including login, registration, and password reset flows.

## Stack
- React.js (Create React App)
- Module Federation (remote)
- TailwindCSS

## Setup
1. Scaffold the app:
   ```sh
   npx create-react-app auth-mfe --template typescript
   cd auth-mfe
   ```
2. Set up Module Federation as a remote (see [Module Federation for CRA](https://github.com/module-federation/module-federation-examples/tree/master/examples/cra)).
3. Expose Auth pages/components for consumption by the App Shell.
4. Integrate with the User Service for authentication (JWT/OAuth).
5. Implement login, registration, and password reset flows.
6. Style the UI with TailwindCSS.
7. Add a Dockerfile for containerization.
8. Add to `infra/Tiltfile` for local orchestration.
9. Test integration with App Shell. 
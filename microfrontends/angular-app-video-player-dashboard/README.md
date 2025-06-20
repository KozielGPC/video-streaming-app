# Video Player Dashboard Microfrontend

This project is a microfrontend that provides a dashboard for video content management within the larger video streaming application. It allows users to upload, view, and manage their videos.

## About This Project

The Video Player Dashboard is a critical component of the creator-facing side of the platform. It's developed as a microfrontend to be independently deployable and maintainable. It uses Webpack's Module Federation to expose its components to be consumed by the main application shell.

## Tech Stack

*   **[Angular](https://angular.io/)**: A platform for building mobile and desktop web applications.
*   **[TypeScript](https://www.typescriptlang.org/)**: A superset of JavaScript that adds static types.
*   **[RxJS](https://rxjs.dev/)**: A library for reactive programming using Observables.
*   **[Module Federation](https://webpack.js.org/concepts/module-federation/)**: A feature of Webpack 5 that allows for sharing code and dependencies between applications.
*   **[Angular Architects Module Federation Plugin](https://github.com/angular-architects/module-federation)**: A plugin to simplify using Module Federation with Angular.
*   **[Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)**: Used to expose Angular components as custom elements.

## Getting Started

### Prerequisites

*   Node.js and npm installed.
*   The main application shell running.

### Installation and Running

1.  Install the dependencies:
    ```bash
    npm install
    ```

2.  To serve the microfrontend for development, it should be run as part of the larger application using the module federation development server.
    ```bash
    npm run run:all
    ```
    This script, provided by `@angular-architects/module-federation`, will start a development server that is aware of the federated modules.

3.  If you need to run this microfrontend in isolation (for component development, for example), you can use the standard Angular CLI serve command:
    ```bash
    npm run start
    ```
    Navigate to `http://localhost:4200/`. Note that in this mode, integrations with other microfrontends will not work.

## Building

To build the project for production, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. The production build is optimized for performance.

## Running unit tests

To execute unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

## Code Scaffolding

To generate a new component, you can use the Angular CLI:

```bash
ng generate component my-new-component
```

You can also generate directives, pipes, services, classes, guards, interfaces, enums, and modules.
For more information, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

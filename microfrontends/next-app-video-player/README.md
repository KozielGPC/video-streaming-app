# Next.js Video Player Microfrontend

This project is a microfrontend responsible for the video playing capabilities of the application. It's built with Next.js and uses Module Federation to be integrated into a larger application shell.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Ant Design](https://ant.design/)
- **Video Playback**: [Shaka Player](https://github.com/shaka-project/shaka-player)
- **Module Federation**: [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- **Linting**: [ESLint](https://eslint.org/)
- **Date Utility**: [date-fns](https://date-fns.org/)

## Project Architecture

The project follows a standard Next.js `src` directory structure:

-   `src/pages`: Contains the pages of the application.
    -   `/[slug]`: A dynamic route that displays the video player for a specific video.
    -   `components`: Shared components used across different pages.
-   `src/components`: Contains reusable React components.
    -   `Layout`: Components for the general layout, like Header and Footer.
    -   `NavBar`: The navigation bar component.
    -   `VideoCard`: Component for displaying video thumbnails and information.
    -   `VideoSection`: A section to group video cards.
-   `src/actions`: Server-side actions.
-   `src/@types`: TypeScript type definitions.
-   `public`: Static assets.

## Getting Started

To get the development server running:

1.  Install dependencies. Choose your package manager:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```
    This will start the application on [http://localhost:3005](http://localhost:3005).

## Important Information

-   **Module Federation**: This application is designed to be a microfrontend and exposes components to be consumed by other applications (e.g., an application shell). The configuration for this can be found in `next.config.ts`.
-   **Port**: The development server runs on port `3005` by default, as defined in the `dev` script in `package.json`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

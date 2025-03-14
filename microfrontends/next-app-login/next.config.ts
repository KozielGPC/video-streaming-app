// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         hostname: "localhost",
//       },
//       {
//         hostname: "placehold.co",
//       },
//     ],
//   },
//   experimental: {
//     after: true,
//   },
// };

// export default nextConfig;

import { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins.push(
      new NextFederationPlugin({
        name: "nextMicrofrontend",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          // './Header': './components/Header.tsx',
          // './Footer': './components/Footer.tsx',
          // './ProductList': './components/ProductList.tsx',
          "./Home": "./src/pages/page.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
          "next/navigation": { singleton: true, requiredVersion: false },
        },
        extraOptions: {
          skipSharingNextInternals: false,
        },
      })
    );

    return config;
  },
  images: {
    domains: ["localhost", "placehold.co"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

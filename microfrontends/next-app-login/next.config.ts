import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "teste",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Home": "./src/pages/index.tsx",
        },
        shared: {},
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      })
    );
    if (!isServer) {
      config.output.publicPath = "http://localhost:3006/_next/";
    }

    return config;
  },
  images: {
    domains: ["localhost", "placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hp-api.onrender.com",
      },
    ],
  },
};

export default nextConfig;
import { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "main-host",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          "login": `login@http://localhost:3005/_next/static/${
            options.isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          "teste": `teste@http://localhost:3006/_next/static/${
            options.isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          "videoPlayer": "videoPlayer@http://localhost:4200/remoteEntry.js",
        },
        shared: {},
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      })
    );
    return config;
  },
  // i18n: {
  //   locales: ["en", "es"],
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
  trailingSlash: true,
  images: {
    domains: ["localhost", "placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
};

export default nextConfig;
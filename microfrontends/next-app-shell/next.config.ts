import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        extraOptions: {},
        name: 'host',
        remotes: {
          nextMicrofrontend: "nextMicrofrontend@http://localhost:3001/_next/static/chunks/remoteEntry.js",
          reactApp: 'reactApp@http://localhost:3001/remoteEntry.js',
          angularApp: 'angularApp@http://localhost:4200/remoteEntry.js',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );
    return config;
  },
};

export default nextConfig;

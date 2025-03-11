import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
  experimental: {
    after: true,
  },
};

export default nextConfig;

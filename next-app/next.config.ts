import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "via.placeholder.com",
      },
    ],
  },
  experimental: {
    after: true,
  },
};

export default nextConfig;

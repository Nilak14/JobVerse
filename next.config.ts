import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    after: true,
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;

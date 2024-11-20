import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    after: true,
    staleTimes: {
      dynamic: 30, // cache dynamic route for 30 sec in client side navigation
      static: 180, // cache static route for 180 sec in client side navigation
    },
  },
};

export default nextConfig;

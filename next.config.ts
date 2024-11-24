import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    after: true,
    ppr: true,
    staleTimes: {
      dynamic: 30, // cache dynamic route for 30 sec in client side navigation
      static: 180, // cache static route for 180 sec in client side navigation
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.UPLOADTHING_APP_ID}/`,
      },
    ],
  },
};

export default nextConfig;

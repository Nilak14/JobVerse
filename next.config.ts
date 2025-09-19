import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      canvas: "./lib/canvas.ts",
    },
  },
  experimental: {
    staleTimes: {
      dynamic: 30, // cache dynamic route for 30 sec in client side navigation
      static: 180, // cache static route for 180 sec in client side navigation
    },
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.UPLOADTHING_APP_ID}.ufs.sh`,
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "f5rwp8m32qkziuag.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "jobverse",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // cache dynamic route for 30 sec in client side navigation
      static: 180, // cache static route for 180 sec in client side navigation
    },
    // ppr: true,
    // dynamicIO: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.UPLOADTHING_APP_ID}.ufs.sh`,
        pathname: "/f/*",
      },
      // {
      //   protocol: "https",
      //   hostname: "utfs.io",
      //   pathname: `/a/${process.env.UPLOADTHING_APP_ID}/*`,
      // },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

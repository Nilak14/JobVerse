import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { METADATA_CONFIG } from "@/config/metadata";
import ThemeProvider from "@/context/ThemeProvider";
import Toaster from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./api/uploadthing/core";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/context/PH_Provider";
const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = METADATA_CONFIG;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <link
        rel="icon"
        type="image/png"
        href="/favicon-48x48.png"
        sizes="48x48"
      />

      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <meta
        name="google-site-verification"
        content="XMUC6CCDKCNsy6UZamxuVqmwZqoFwG0Go3AKrEY_MuQ"
      />
      <meta name="apple-mobile-web-app-title" content="JobVerse" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <body className={`${font.className} antialiased`}>
        <PostHogProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader height={5} color="#e9590c" />
              {children}
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}

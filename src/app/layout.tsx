import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { METADATA_CONFIG } from "@/config/metadata";
// import { Toaster } from "sonner";
import ThemeProvider from "@/context/ThemeProvider";
import Toaster from "@/components/ui/toaster";

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
      <meta name="apple-mobile-web-app-title" content="JobVerse" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <body className={`${font.className} antialiased`}>
        <ThemeProvider>
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

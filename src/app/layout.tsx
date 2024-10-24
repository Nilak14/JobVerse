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
      <body className={`${font.className} antialiased`}>
        <ThemeProvider>
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

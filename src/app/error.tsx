"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Briefcase, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/LandingPage/NavBar";
import { JobVerseLogo } from "../../public/logo/jobverse";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  // Function to safely handle reset
  const handleReset = () => {
    if (typeof reset === "function") {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-xl">
            {/* JobVerse Logo/Branding */}
            <div className="flex items-center justify-center gap-3">
              <JobVerseLogo
                width={35 + "px"}
                height={35 + "px"}
                fill="#e9590c"
              />
              <h1 className="text-2xl font-bold text-primary">JobVerse</h1>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-3 text-gray-600">
                We're sorry, but we encountered an unexpected error while
                loading this page. Our team has been notified.
              </p>
              {error && error.digest ? (
                <p className="mt-2 text-sm text-gray-500">
                  Error reference: {error.digest}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                <Button
                  className="flex-1  flex items-center justify-center gap-2"
                  asChild
                >
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4" />
                    Go home
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try again
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500">
                If the problem persists, please contact our support team.
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            © {new Date().getFullYear()} JobVerse. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  );
}

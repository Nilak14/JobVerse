import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function AgentSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center justify-between w-full">
        {/* AI Interviewer Card Skeleton */}
        <Card className="border-2 border-orange-200/20 dark:border-orange-900/20 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[350px] flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 items-center justify-center relative">
              <div className="z-10 flex flex-col items-center justify-center">
                <div className="relative">
                  <Skeleton className="rounded-full size-[120px] bg-orange-200/50 dark:bg-orange-800/30" />
                </div>
                <Skeleton className="h-6 w-32 mt-5 bg-orange-200/50 dark:bg-orange-800/30" />
                <Skeleton className="h-4 w-20 mt-2 bg-orange-200/50 dark:bg-orange-800/30" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-200/20 dark:from-orange-800/20 to-transparent" />
            </div>
          </CardContent>
        </Card>

        {/* User Card Skeleton */}
        <Card className="border-2 border-orange-200/20 dark:border-orange-900/20 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[350px] flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 items-center justify-center relative">
              <div className="z-10 flex flex-col items-center justify-center">
                <Skeleton className="rounded-full size-[120px] bg-orange-200/50 dark:bg-orange-800/30" />
                <Skeleton className="h-6 w-32 mt-5 bg-orange-200/50 dark:bg-orange-800/30" />
                <Skeleton className="h-4 w-20 mt-2 bg-orange-200/50 dark:bg-orange-800/30" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-200/20 dark:from-orange-800/20 to-transparent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Area Skeleton */}
      <div className="mt-10 w-full">
        <Card className="border-2 border-orange-200/20 dark:border-orange-900/20 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 dark:from-orange-950/40 dark:via-orange-900/30 dark:to-orange-950/40 p-6 min-h-[80px] flex items-center justify-center">
              <Skeleton className="h-6 w-3/4 max-w-lg bg-orange-200/50 dark:bg-orange-800/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Button Skeleton */}
      <div className="w-full flex justify-center mt-10 mb-6">
        <Button
          disabled
          size="lg"
          className="relative px-8 py-6 font-semibold text-white bg-orange-400/70 dark:bg-orange-600/50 rounded-full shadow-lg min-w-36 cursor-not-allowed opacity-70"
        >
          <Phone className="mr-2 h-5 w-5" />
          <span>Loading...</span>
        </Button>
      </div>
    </div>
  );
}

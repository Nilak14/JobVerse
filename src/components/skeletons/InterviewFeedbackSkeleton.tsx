"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";

const FeedbackSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6">
        <div className="space-y-8">
          {/* Header Section with Overall Score */}
          <div className="p-6 bg-black rounded-lg border border-border">
            <div className="flex items-center gap-6">
              <div className="relative h-28 w-28 flex-shrink-0">
                <Skeleton className="h-28 w-28 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="h-14 w-14 rounded-full" />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          {/* Strengths and Areas for Improvement Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths Section */}
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-36" />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </div>

            {/* Areas for Improvement Section */}
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Assessment Title */}
          <Skeleton className="h-8 w-56 my-6" />

          {/* Category Score Cards */}
          <div className="space-y-6">
            {/* Communication Skills */}
            <div className="p-6 bg-background border border-border rounded-lg">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-12 ml-4" />
              </div>
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Technical Knowledge */}
            <div className="p-6 bg-background border border-border rounded-lg">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-12 ml-4" />
              </div>
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Problem Solving */}
            <div className="p-6 bg-background border border-border rounded-lg">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-12 ml-4" />
              </div>
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Cultural Fit */}
            <div className="p-6 bg-background border border-border rounded-lg">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-12 ml-4" />
              </div>
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Confidence and Clarity */}
            <div className="p-6 bg-background border border-border rounded-lg">
              <Skeleton className="h-6 w-44 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-12 ml-4" />
              </div>
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          {/* Retake Interview Button */}
          <div className="flex justify-center mt-12">
            <Button
              disabled
              size="lg"
              className="gap-2 px-8 py-6 text-base opacity-70 cursor-not-allowed"
            >
              <RefreshCw className="h-5 w-5 animate-spin" />
              Retake Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSkeleton;

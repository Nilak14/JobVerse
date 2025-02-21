import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const AccountSecuritySkeleton = () => {
  return (
    <>
      <div className="space-y-3 mb-4">
        <Skeleton className="h-6 w-36" />

        {/* Change Password Card Skeleton */}
        <div className="flex justify-between items-center flex-col md:flex-row p-4 border-input border-2 rounded-lg">
          <div className="flex items-center gap-5">
            <Skeleton className="h-5 w-5 hidden md:block" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
          <Skeleton className="h-9 w-full md:w-40 mt-5" />
        </div>

        {/* Two Factor Authentication Card Skeleton */}
        <div className="flex justify-between items-center flex-col md:flex-row p-4 border-input border-2 rounded-lg">
          <div className="flex items-center gap-5">
            <Skeleton className="h-5 w-5 hidden md:block" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
          <Skeleton className="h-9 w-full md:w-40 mt-5" />
        </div>
      </div>

      <Separator />

      {/* Privacy Settings Section Skeleton */}
      <div className="space-y-3 mb-4 mt-4">
        <Skeleton className="h-6 w-36" />

        <div className="flex justify-between items-center p-4 border-input border-2 rounded-lg">
          <div className="flex items-center gap-5">
            <Skeleton className="h-5 w-5 hidden md:block" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
          <Skeleton className="h-6 w-10" />
        </div>
      </div>
    </>
  );
};

export default AccountSecuritySkeleton;

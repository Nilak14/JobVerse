"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
const JobCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between flex-row mb-3">
            <div className="flex gap-4 items-center">
              <Skeleton className="size-[50px] rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>
            <Skeleton className="size-5" />
          </div>
          <div>
            <Separator />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-5 items-center">
              <Skeleton className="h-8 w-24 rounded-xl" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JobCardSkeleton;

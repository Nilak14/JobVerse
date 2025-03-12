"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const BillingSkeleton = () => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Current Plan Card Skeleton */}
      <Card className="p-6 bg-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-3/4">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
      </Card>

      {/* Plan Comparison Skeleton */}
      <motion.div variants={item} className="mt-5">
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent>
            {/* Desktop view skeleton */}
            <div className="hidden md:block overflow-x-auto">
              <div className="w-full">
                {/* Header */}
                <div className="flex border-b pb-3">
                  <div className="w-1/4 px-4">
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="w-1/4 px-4">
                    <Skeleton className="h-6 w-20 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="w-1/4 px-4">
                    <Skeleton className="h-6 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="w-1/4 px-4">
                    <Skeleton className="h-6 w-20 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>

                {/* Rows */}
                {[1, 2, 3, 4].map((row) => (
                  <div key={row} className="flex border-b py-3">
                    <div className="w-1/4 px-4">
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <div className="w-1/4 px-4">
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="w-1/4 px-4">
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div className="w-1/4 px-4">
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile view skeleton */}
            <div className="md:hidden space-y-6">
              {[1, 2, 3].map((plan) => (
                <div key={plan} className="border rounded-lg p-4">
                  <Skeleton className="h-6 w-28 mb-2" />
                  <Skeleton className="h-4 w-20 mb-4" />

                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((feature) => (
                      <div key={feature} className="flex justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default BillingSkeleton;

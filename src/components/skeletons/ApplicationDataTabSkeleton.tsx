"use client";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "../ui/skeleton";

const ApplicationDataTabSkeleton = () => {
  // Define tab values to match the real component
  const tabValues = ["ALL", "PENDING", "INTERVIEW", "APPROVED", "REJECTED"];

  return (
    <Tabs defaultValue="ALL" className="space-y-6 mt-8">
      <div className="space-y-6 relative">
        <ScrollArea>
          <div className="w-full relative h-12">
            <TabsList className="flex absolute h-12">
              {tabValues.map((tab) => (
                <TabsTrigger key={tab} className="py-2" value={tab}>
                  <div className="flex items-center">
                    {tab} <Skeleton className="h-5 w-8 ml-1 rounded-full" />
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {tabValues.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="rounded-md border">
              {/* Table Header Skeleton */}
              <div className="border-b">
                <div className="flex p-4">
                  <Skeleton className="h-8 w-8 rounded mr-2" /> {/* Checkbox */}
                  <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 w-full gap-4">
                    <Skeleton className="h-8 w-28" /> {/* Company */}
                    <Skeleton className="h-8 w-32" /> {/* Job Title */}
                    <Skeleton className="h-8 w-24 hidden md:block" />{" "}
                    {/* Date */}
                    <Skeleton className="h-8 w-20" /> {/* Status */}
                    <Skeleton className="h-8 w-24 hidden lg:block" />{" "}
                    {/* Location */}
                    <Skeleton className="h-8 w-20 hidden lg:block" />{" "}
                    {/* Salary */}
                    <Skeleton className="h-8 w-16" /> {/* Actions */}
                  </div>
                </div>
              </div>

              {/* Table Rows Skeleton - Generate 5 skeleton rows */}
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex p-4 border-b">
                    <Skeleton className="h-4 w-4 rounded mr-2" />{" "}
                    {/* Checkbox */}
                    <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 w-full gap-4">
                      <div>
                        <Skeleton className="h-6 w-24 mb-2" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-28 mb-2" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="hidden md:block">
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div>
                        <Skeleton className="h-8 w-20 rounded-full" />
                      </div>
                      <div className="hidden lg:block">
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="hidden lg:block">
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}

              {/* Empty space for pagination if needed */}
              <div className="p-4 flex justify-end">
                <Skeleton className="h-8 w-64" />
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default ApplicationDataTabSkeleton;

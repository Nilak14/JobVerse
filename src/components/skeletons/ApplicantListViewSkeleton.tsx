import { Skeleton } from "@/components/ui/skeleton";

export function ApplicantListSkeleton() {
  // Create an array of 6 items for the skeleton
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="space-y-4">
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <div className="flex-shrink-0">
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <div className="grid flex-1 gap-2">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="hidden h-5 w-20 rounded-full sm:inline-flex" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-4 w-28" />
                <div className="hidden flex-wrap gap-2 md:flex">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <div className="hidden gap-2 md:flex">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
              <Skeleton className="hidden h-9 w-24 rounded-md md:inline-flex" />
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md md:hidden" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

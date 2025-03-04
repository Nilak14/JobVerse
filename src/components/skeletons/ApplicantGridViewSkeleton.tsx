import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function ApplicantGridSkeleton() {
  // Create an array of 9 items for the skeleton
  const skeletonItems = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skeletonItems.map((item) => (
        <Card key={item} className="h-full overflow-hidden">
          <CardHeader className="pt-6 px-6 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="mb-4">
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t p-6">
            <div className="flex w-full gap-2">
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

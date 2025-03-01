import { createArray } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
interface JobApplicationStatsSkeletonProps {
  totalCardCount?: number;
}
const JobApplicationStatsSkeleton = ({
  totalCardCount = 6,
}: JobApplicationStatsSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {createArray(totalCardCount).map((_, index) => (
        <>
          <Card key={index}>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        </>
      ))}
    </div>
  );
};

export default JobApplicationStatsSkeleton;

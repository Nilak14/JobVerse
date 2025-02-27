import { Skeleton } from "@/components/ui/skeleton";
interface ResumeStudioSkeletonProps {
  total?: number;
}
const ResumeStudioSkeleton = ({ total = 4 }: ResumeStudioSkeletonProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(total)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="border rounded-lg border-transparent bg-secondary p-3"
          >
            <div className="space-y-3">
              {/* Title Skeleton */}
              <div className="w-full text-center">
                <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
                {/* Description Skeleton */}
                <Skeleton className="h-4 w-5/6 mx-auto mb-1" />
                <Skeleton className="h-4 w-4/6 mx-auto mb-2" />
                {/* Date Skeleton */}
                <Skeleton className="h-3 w-2/5 mx-auto" />
              </div>

              {/* Resume Preview Skeleton */}
              <div className="relative w-full aspect-[1/1.4] overflow-hidden">
                <Skeleton className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-secondary to-transparent" />
              </div>
            </div>

            {/* Menu Button Skeleton */}
            <div className="absolute right-0.5 top-0.5">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
    </section>
  );
};

export default ResumeStudioSkeleton;

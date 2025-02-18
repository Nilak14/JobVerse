import { Skeleton } from "../ui/skeleton";

const JobDescriptionPageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton className="h-20 w-20 rounded-md" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>

      <Skeleton className="h-64 w-full rounded-md" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-md" />
          <Skeleton className="h-36 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};
export default JobDescriptionPageSkeleton;

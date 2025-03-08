import { Skeleton } from "../ui/skeleton";

const ResumePageButtonSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-36" />
    </div>
  );
};
export default ResumePageButtonSkeleton;

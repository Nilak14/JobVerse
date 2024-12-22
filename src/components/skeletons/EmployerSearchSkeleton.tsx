import { Skeleton } from "../ui/skeleton";

const EmployerSearchSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 justify-between ">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-[250px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
      <Skeleton className="h-9 px-4 py-2 w-20" />
    </div>
  );
};
export default EmployerSearchSkeleton;

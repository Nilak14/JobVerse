import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobCard from "@/components/Job/JobCard";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import { createArray } from "@/lib/utils";
import { useNearByJobs } from "@/hooks/query-hooks/useNearByJobs";
import { EmptyState } from "@/components/Global/EmptyState";

const NearByJobs = () => {
  const { data, isLoading } = useNearByJobs();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="bg-primary/20 p-2 rounded-lg mr-3">
            <MapPin className="text-primary" size={20} />
          </div>
          <p className="text-xl">Jobs Nearby</p>
        </CardTitle>
        <CardDescription>
          Discover job opportunities close to your current location
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
            {createArray(3).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5 ">
            {data?.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        )}
        <>
          {!isLoading && data?.length === 0 && (
            <EmptyState
              title="No jobs found nearby"
              description="Try changing your location or search for jobs in a different area."
              icon={<MapPin />}
            />
          )}
        </>
      </CardContent>
    </Card>
  );
};
export default NearByJobs;

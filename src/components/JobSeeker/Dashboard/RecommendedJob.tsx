import { EmptyState } from "@/components/Global/EmptyState";
import JobCard from "@/components/Job/JobCard";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import { Button } from "@/components/ui/button";
import { getRecommendedJob } from "@/data-access/job/getRecommendedJob";
import { createArray } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface RecommendedJobProps {
  jobseekerId: string;
}
const RecommendedJob = ({ jobseekerId }: RecommendedJobProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1 mt-4">Recommended Jobs</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Jobs that match your profile and preferences
      </p>
      <div>
        <Suspense fallback={<RecommendedJobFetcherSkeleton />}>
          <RecommendedJobFetcher jobseekerId={jobseekerId} />
        </Suspense>
      </div>
    </div>
  );
};
export default RecommendedJob;

const RecommendedJobFetcherSkeleton = () => {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
      {createArray(10).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
};

const RecommendedJobFetcher = async ({ jobseekerId }: RecommendedJobProps) => {
  const recommendedJob = await getRecommendedJob(jobseekerId);
  if (!recommendedJob || recommendedJob.length === 0) {
    return (
      <EmptyState
        title="No Recommended Jobs Found"
        description="Complete Your Skills In Profile To Get Recommendations"
        icon={<Briefcase />}
        action={
          <Button asChild>
            <Link
              href={
                "/job-seeker/settings/account-settings?tab=professional-details"
              }
            >
              Go To Profile Settings
            </Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
      {recommendedJob.map((job) => (
        <JobCard key={job?.id} job={job!} />
      ))}
    </div>
  );
};

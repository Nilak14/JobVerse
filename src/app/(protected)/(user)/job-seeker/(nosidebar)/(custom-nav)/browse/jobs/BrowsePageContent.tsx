import InfiniteScrollContainer from "@/components/Global/InfiniteScrollContainer";
import JobCard from "@/components/Job/JobCard";
import JobNotFound from "@/components/Job/JobNotFound";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import { JobDataBrowse } from "@/lib/prisma-types/Job";
import { createArray } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
interface BrowsePageContentProps {
  jobs: JobDataBrowse[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  status: "idle" | "error" | "loading" | "success";
}
const BrowsePageContent = ({
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  jobs,
  status,
}: BrowsePageContentProps) => {
  return (
    <div>
      {status === "success" && jobs.length === 0 && !hasNextPage && (
        <JobNotFound />
      )}
      <InfiniteScrollContainer
        onBottomReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      >
        {status === "loading" ? (
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
            {createArray(10).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
            {jobs.map((job) => (
              <JobCard key={job?.id} job={job!} />
            ))}
          </motion.div>
        )}

        {isFetchingNextPage && (
          <Loader2 className="mx-auto animate-spin my-3" />
        )}
      </InfiniteScrollContainer>
    </div>
  );
};
export default BrowsePageContent;

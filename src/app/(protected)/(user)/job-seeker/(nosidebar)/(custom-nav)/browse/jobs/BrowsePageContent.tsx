import InfiniteScrollContainer from "@/components/Global/InfiniteScrollContainer";
import JobCard from "@/components/Job/JobCard";
import { Input } from "@/components/ui/input";
import { JobDataBrowse } from "@/lib/prisma-types/Job";
import { Loader2, Search } from "lucide-react";
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
      <InfiniteScrollContainer
        onBottomReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
        className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5"
      >
        {status === "success" && jobs.length === 0 && !hasNextPage && (
          <p>No Jobs Found</p>
        )}
        {status === "loading" ? (
          <div>loading...</div>
        ) : (
          <>
            {jobs.map((job) => (
              <JobCard key={job?.id} job={job!} />
            ))}
          </>
        )}

        {isFetchingNextPage && (
          <Loader2 className="mx-auto animate-spin my-3" />
        )}
      </InfiniteScrollContainer>
    </div>
  );
};
export default BrowsePageContent;

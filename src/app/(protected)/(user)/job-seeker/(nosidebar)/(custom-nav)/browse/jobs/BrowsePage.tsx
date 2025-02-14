"use client";

import InfiniteScrollContainer from "@/components/Global/InfiniteScrollContainer";
import JobCard from "@/components/Job/JobCard";
import { useBrowseJobInfiniteQuery } from "@/hooks/query-hooks/useBrowseJobInfiniteQuery";
import { Loader2 } from "lucide-react";
import BrowsePageTop from "./BrowsePageTop";
import BrowsePageFilter from "./BrowseJobFilter";
import { ExtendedUser } from "@/next-auth";

const HEADER_HEIGHT = "4rem";

interface BrowsePageProps {
  user: ExtendedUser;
}

const BrowsePage = ({ user }: BrowsePageProps) => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useBrowseJobInfiniteQuery();

  const jobs = data?.pages.flatMap((page) => page.data?.data.jobs) ?? [];

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return (
      <p className="text-center">An Error Occurred while loading the posts</p>
    );
  }

  if (status === "success" && jobs.length === 0 && !hasNextPage) {
    return <p className="text-center">No Jobs Found</p>;
  }

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Fixed Header */}
      <header
        className="fixed top-0 left-0 right-0 z-20"
        style={{ height: HEADER_HEIGHT }}
      >
        <BrowsePageTop user={user} />
      </header>

      {/* Fixed Sidebar for md+ screens */}
      <aside
        className="hidden md:block fixed top-[4rem] bottom-0 left-0 p-4 overflow-y-auto"
        style={{ width: "25%" }}
      >
        <BrowsePageFilter />
      </aside>

      {/* Main scrollable content */}
      <main
        className="absolute top-[4rem] bottom-0 right-0 overflow-y-auto p-4"
        style={{ left: "0" }}
      >
        <div className="md:pl-[25%] lg:pl-[20%]">
          <InfiniteScrollContainer
            onBottomReached={() => {
              if (hasNextPage && !isFetching) {
                fetchNextPage();
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {jobs.map((job) => (
              <JobCard key={job?.id} job={job!} />
            ))}
            {jobs.map((job) => (
              <JobCard key={job?.id} job={job!} />
            ))}
            {jobs.map((job) => (
              <JobCard key={job?.id} job={job!} />
            ))}
            {jobs.map((job) => (
              <JobCard key={job?.id} job={job!} />
            ))}
            {jobs.map((job) => (
              <JobCard key={job?.id} job={job!} />
            ))}
            {isFetchingNextPage && (
              <Loader2 className="mx-auto animate-spin my-3" />
            )}
          </InfiniteScrollContainer>
        </div>
      </main>
    </div>
  );
};

export default BrowsePage;

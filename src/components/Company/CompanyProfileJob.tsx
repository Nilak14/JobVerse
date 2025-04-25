"use client";

import { useCompanyJobInfiniteQuery } from "@/hooks/query-hooks/useCompanyJobInfiniteQuery";
import JobNotFound from "../Job/JobNotFound";
import InfiniteScrollContainer from "../Global/InfiniteScrollContainer";
import { motion } from "framer-motion";
import { createArray } from "@/lib/utils";
import JobCardSkeleton from "../skeletons/JobCardSkeleton";
import JobCard from "../Job/JobCard";
import { Loader2 } from "lucide-react";
interface CompanyProfileJobProps {
  companyId: string;
}
const CompanyProfileJob = ({ companyId }: CompanyProfileJobProps) => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useCompanyJobInfiniteQuery(companyId);

  const jobs =
    data?.pages
      .flatMap((page) => page.data?.data.jobs)
      .filter((job) => job !== undefined) ?? [];

  return (
    <div>
      {status === "success" && jobs.length === 0 && !hasNextPage && (
        <JobNotFound mainText="No jobs posted by this company" subText="" />
      )}
      <div>
        <InfiniteScrollContainer
          className="mb-10"
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
    </div>
  );
};
export default CompanyProfileJob;

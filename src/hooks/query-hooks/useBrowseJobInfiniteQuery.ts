import { kyInstance } from "@/lib/ky";
import { JobDataBrowseAPIResponse } from "@/lib/prisma-types/Job";

import { useInfiniteQuery } from "react-query";

export interface Filters {
  workMode: string;
  jobTypes: string;
  experienceLevel: string;
}

export const useBrowseJobInfiniteQuery = (filters: Filters) => {
  return useInfiniteQuery({
    queryKey: ["browse-jobs", "job-feed", filters],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (pageParam) {
        params.set("cursor", pageParam);
      }
      if (filters.workMode) {
        params.set("workMode", filters.workMode);
      }
      if (filters.jobTypes) {
        params.set("jobTypes", filters.jobTypes);
      }
      if (filters.experienceLevel) {
        params.set("experienceLevel", filters.experienceLevel);
      }
      const url = `/api/jobs/browse?${params.toString()}`;
      return kyInstance.get(url).json<JobDataBrowseAPIResponse>();
    },
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ?? undefined,
  });
};

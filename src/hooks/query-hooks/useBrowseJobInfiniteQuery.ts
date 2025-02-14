import { kyInstance } from "@/lib/ky";
import { JobDataBrowseAPIResponse } from "@/lib/prisma-types/Job";

import { useInfiniteQuery } from "react-query";

export const useBrowseJobInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["browse-jobs", "job-feed"],
    queryFn: async ({ pageParam }) =>
      kyInstance
        .get(`/api/jobs/browse${pageParam ? `?cursor=${pageParam}` : ""}`)
        .json<JobDataBrowseAPIResponse>(),
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor,
  });
};

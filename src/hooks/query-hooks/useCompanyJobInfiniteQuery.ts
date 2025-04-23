import { kyInstance } from "@/lib/ky";
import { JobDataBrowseAPIResponse } from "@/lib/prisma-types/Job";
import { useInfiniteQuery } from "react-query";

export const useCompanyJobInfiniteQuery = (companyId: string) => {
  return useInfiniteQuery({
    queryKey: ["company-jobs", companyId],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (pageParam) {
        params.set("cursor", pageParam);
      }
      const url = `/api/jobs/company/${companyId}?${params.toString()}`;
      return kyInstance.get(url).json<JobDataBrowseAPIResponse>();
    },
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ?? undefined,
  });
};

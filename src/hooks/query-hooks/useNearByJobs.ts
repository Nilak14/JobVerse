import { JVRequest } from "@/lib/JVRequest";
import { JobDataBrowse } from "@/lib/prisma-types/Job";
import { useQuery } from "react-query";

export const useNearByJobs = () => {
  return useQuery({
    queryKey: ["nearby-jobs"],
    queryFn: async () => {
      const res = await JVRequest.get(`/api/jobs/nearby`);
      if (!res || !res.data) {
        return [];
      }
      return res.data.jobs as JobDataBrowse[];
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

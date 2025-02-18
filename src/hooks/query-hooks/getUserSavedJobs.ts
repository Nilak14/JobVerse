import { JVRequest } from "@/lib/JVRequest";
import { JobDataBrowse } from "@/lib/prisma-types/Job";
import { useQuery } from "react-query";

export const getUserSavedJob = () => {
  return useQuery({
    queryKey: ["saved-job"],
    queryFn: async () => {
      const res = await JVRequest.get(`/api/jobs/saved`);
      if (!res || !res.data) {
        return [] as JobDataBrowse[];
      }
      return res.data.jobs as JobDataBrowse[];
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

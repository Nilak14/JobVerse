import { JVRequest } from "@/lib/JVRequest";
import { SaveJobInfo } from "@/lib/types";
import { useQuery } from "react-query";

export const getSavedJobInfo = (jobId: string, initialState: SaveJobInfo) => {
  return useQuery({
    queryKey: ["saved-job-info", jobId],
    queryFn: async () => {
      const res = await JVRequest.get(`/api/jobs/${jobId}/save`);
      if (!res || !res.data) {
        return {} as SaveJobInfo;
      }
      return res.data.data as SaveJobInfo;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    initialData: initialState,
  });
};

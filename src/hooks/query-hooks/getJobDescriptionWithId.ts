import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryGetJobDescriptionById = (jobId: string) => {
  return useQuery({
    queryKey: ["job-modal-description", jobId],
    queryFn: async () => await JVRequest.get(`/api/jobs/${jobId}/description`),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const getUserUploadedResume = (resumeId: string) => {
  return useQuery({
    queryKey: ["resume-uploaded"],
    queryFn: async () => {
      const res = await JVRequest.get(`/api/resume/uploaded/${resumeId}`);
      if (!res || !res.data) {
        return null;
      }
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

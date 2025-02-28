import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const getJobSeekerProfile = () => {
  return useQuery({
    queryKey: ["jobSeekerProfile"],
    queryFn: async () => await JVRequest.get("/api/users/job-seeker/profile"),
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

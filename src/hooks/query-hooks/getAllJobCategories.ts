import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryJobCategories = () => {
  return useQuery({
    queryKey: ["job-categories"],
    queryFn: async () => await JVRequest.get("/api/job-categories"),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryCardAnalytics = () => {
  return useQuery({
    queryKey: ["card"],
    queryFn: async () => await JVRequest.get(`/api/analytics/overview/card`),
  });
};

import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryCardAnalytics = () => {
  return useQuery({
    queryKey: ["card"],
    queryFn: async () => await JVRequest.get(`/api/analytics/overview/card`),
    refetchOnWindowFocus: false,
  });
};

export const useQueryJobCardAnalytics = () => {
  return useQuery({
    queryKey: ["jobCard"],
    queryFn: async () => await JVRequest.get(`/api/analytics/job/card`),
    refetchOnWindowFocus: false,
  });
};

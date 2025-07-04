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
export const useQueryEmployerCardAnalytics = (companyId: string) => {
  return useQuery({
    queryKey: ["employerCard", companyId],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/employer/card-data`),
    refetchOnWindowFocus: false,
  });
};
export const useQueryJobSeekerCardAnalytics = () => {
  return useQuery({
    queryKey: ["job-seeker-card"],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/job-seeker/card-data`),
    refetchOnWindowFocus: false,
  });
};

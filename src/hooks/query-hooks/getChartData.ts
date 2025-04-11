import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryUserDistribution = () => {
  return useQuery({
    queryKey: ["user-distribution"],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/overview/user-distribution`),
    refetchOnWindowFocus: false,
  });
};

export const useQueryUserRegistrationTrend = (year: string) => {
  return useQuery({
    queryKey: ["user-registration-trend", year],
    queryFn: async () =>
      await JVRequest.get(
        `/api/analytics/overview/user-registration-trend?year=${year}`
      ),
    refetchOnWindowFocus: false,
  });
};
export const useQueryJobPostTrend = (year: string) => {
  return useQuery({
    queryKey: ["job-post-trend", year],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/job/job-post-trend?year=${year}`),
    refetchOnWindowFocus: false,
  });
};
export const useQueryJobsByCategory = (year: string) => {
  return useQuery({
    queryKey: ["job-by-category", year],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/job/postBy-category?year=${year}`),
    refetchOnWindowFocus: false,
  });
};

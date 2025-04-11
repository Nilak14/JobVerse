import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryUserDistribution = () => {
  return useQuery({
    queryKey: ["user-distribution"],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/overview/user-distribution`),
  });
};

export const useQueryUserRegistrationTrend = (year: string) => {
  return useQuery({
    queryKey: ["user-registration-trend", year],
    queryFn: async () =>
      await JVRequest.get(
        `/api/analytics/overview/user-registration-trend?year=${year}`
      ),
  });
};

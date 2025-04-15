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
export const useQueryRevenueTrend = (year: string) => {
  return useQuery({
    queryKey: ["revenue-trend", year],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/revenue/revenueTrend?year=${year}`),
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
export const useQueryJobSeekerRevenuePieData = () => {
  return useQuery({
    queryKey: ["job-seeker-revenue"],
    queryFn: async () =>
      await JVRequest.get(
        `/api/analytics/revenue/premium-distribution/job-seeker`
      ),
    refetchOnWindowFocus: false,
  });
};
export const useQueryCompanyRevenuePieData = () => {
  return useQuery({
    queryKey: ["company-revenue"],
    queryFn: async () =>
      await JVRequest.get(
        `/api/analytics/revenue/premium-distribution/company`
      ),
    refetchOnWindowFocus: false,
  });
};

export const useQueryEmployerApplicantTrend = (
  year: string,
  companyId: string
) => {
  return useQuery({
    queryKey: ["employer-applicant-trend", year, companyId],
    queryFn: async () =>
      await JVRequest.get(
        `/api/analytics/employer/applicant-trend?year=${year}`
      ),
    refetchOnWindowFocus: false,
  });
};

export const useQueryEmployerApplicationDistribution = (companyId: string) => {
  return useQuery({
    queryKey: ["employer-application-distribution", companyId],
    queryFn: async () =>
      await JVRequest.get(`/api/analytics/employer/application-distribution`),
    refetchOnWindowFocus: false,
  });
};

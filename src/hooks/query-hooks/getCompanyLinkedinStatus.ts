import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryGetCompanyLinkedinStatus = (companyId: string) => {
  return useQuery({
    queryKey: ["linkedin-status", companyId],
    queryFn: async () => await JVRequest.get(`/api/linkedin/get-stats`),
    refetchOnWindowFocus: false,
  });
};

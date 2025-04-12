import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryGetCompanySlackStatus = (companyId?: string) => {
  return useQuery({
    queryKey: ["slack-status", companyId],
    queryFn: async () => await JVRequest.get(`/api/slack/get-stats`),
    refetchOnWindowFocus: false,
    enabled: !!companyId,
  });
};

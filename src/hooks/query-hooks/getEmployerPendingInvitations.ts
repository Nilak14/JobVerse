import { JVRequest } from "@/lib/JVRequest";
import { useQuery } from "react-query";

export const useQueryEmployerPendingInvitations = () => {
  return useQuery({
    queryKey: ["employer-pending-invitations"],
    queryFn: async () => await JVRequest.get("/api/invitations"),
    refetchOnWindowFocus: false,
  });
};

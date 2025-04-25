import { kyInstance } from "@/lib/ky";
import { FollowerResponse } from "@/lib/prisma-types/Company";
import { useQuery } from "react-query";

const useFollowerInfo = (companyId: string, initialState: FollowerResponse) => {
  const query = useQuery({
    queryKey: ["follower-info", companyId],
    queryFn: () => {
      return kyInstance
        .get(`/api/companies/${companyId}/followers`)
        .json<FollowerResponse>();
    },
    initialData: initialState,
    staleTime: Infinity,
  });
  return query;
};
export default useFollowerInfo;

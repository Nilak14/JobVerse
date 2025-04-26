"use client";

import { FollowerResponse } from "@/lib/prisma-types/Company";
import { Button } from "../ui/button";
import useFollowerInfo from "@/hooks/query-hooks/useFollowerInfo";
import { useMutation, useQueryClient } from "react-query";
import { kyInstance } from "@/lib/ky";
import { toast } from "sonner";
interface CompanyFollowButtonProps {
  companyId: string;
  initialState: FollowerResponse;
}
const CompanyFollowButton = ({
  companyId,
  initialState,
}: CompanyFollowButtonProps) => {
  const { data } = useFollowerInfo(companyId, initialState);

  const queryClient = useQueryClient();
  const queryKey = ["follower-info", companyId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data?.data?.data.isFollowedByUser
        ? kyInstance.delete(`/api/companies/${companyId}/followers`)
        : kyInstance.post(`/api/companies/${companyId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState =
        queryClient.getQueryData<FollowerResponse>(queryKey);

      queryClient.setQueryData<FollowerResponse>(queryKey, () => ({
        success: !!previousState?.success,
        message: previousState?.message || "",
        data: {
          data: {
            followers:
              (previousState?.data?.data.followers || 0) +
              (data?.data?.data.isFollowedByUser ? -1 : 1),
            isFollowedByUser: !data?.data?.data.isFollowedByUser,
          },
        },
      }));
      return { previousState };
    },
    onError(error, variable, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      toast.error("Something Went Wrong...", { id: "follow" });
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      variant={data?.data?.data.isFollowedByUser ? "secondary" : "default"}
    >
      {data?.data?.data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
};
export default CompanyFollowButton;

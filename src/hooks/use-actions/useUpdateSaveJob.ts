import { kyInstance } from "@/lib/ky";
import { SaveJobInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
export const useUpdateSaveJob = (jobId: string, saveJobInfo: SaveJobInfo) => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["saved-job-info", jobId];
  return useMutation({
    mutationFn: () =>
      saveJobInfo.isSavedByUser
        ? kyInstance.delete(`/api/jobs/${jobId}/save`)
        : kyInstance.post(`/api/jobs/${jobId}/save`),
    onMutate: async () => {
      if (!saveJobInfo.isSavedByUser) {
        toast.success("Job saved successfully", {
          id: "save-job-toast",
        });
      } else {
        toast.error("Job Removed from saved list", {
          id: "save-job-toast",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["saved-job"] });
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<SaveJobInfo>(queryKey);
      queryClient.setQueryData<SaveJobInfo>(queryKey, () => ({
        isSavedByUser: !previousState?.isSavedByUser,
      }));
      // need to return to previous state to roll back when we get error
      return { previousState };
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["saved-job"] });
    },

    onError(error, variables, context) {
      // we get values what we return as previous state in onMutate
      queryClient.setQueryData(queryKey, context?.previousState);
      toast.error("Something went wrong", { id: "save-job-toast" });
    },
  });
};

import { changeStatus } from "@/actions/adminActions/job/changeStatus";
import { JobReviewStatus } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateJobStatusHookProps {
  jobId: string;
  newStatus: JobReviewStatus;
  message?: string;
  setOpen?: (open: boolean) => void;
}
const updateJobStatusAdmin = ({
  jobId,
  newStatus,
  message,
  setOpen,
}: UpdateJobStatusHookProps) => {
  const [loading, setLoading] = useState(false);
  const handleStatusChange = async () => {
    setLoading(true);
    try {
      const res = await changeStatus(jobId, newStatus, message);
      if (res.success) {
        if (setOpen) {
          setOpen(false);
        }
        toast.success("Job status updated successfully", { id: "job-status" });
      } else {
        toast.error(message, { id: "job-status" });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update job status");
    }
  };

  return { loading, handleStatusChange };
};
export default updateJobStatusAdmin;

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { Textarea } from "@/components/ui/textarea";
import updateJobStatusAdmin from "@/hooks/use-actions/ueUpdateJobStatusAdmin";
import { JobServerDataAdmin } from "@/lib/prisma-types/Job";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface ReviewJobProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  job: JobServerDataAdmin;
}
const NeedReviewJobModal = ({ job, open, setOpen }: ReviewJobProps) => {
  const [changeMessage, setChangeMessage] = useState("");
  const { handleStatusChange, loading } = updateJobStatusAdmin({
    jobId: job.id,
    newStatus: "NEED_REVIEW",
    setOpen,
    message: changeMessage,
  });

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        isloading={loading}
        className="space-y-5 md:space-y-0"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Ask for Changes</ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Are you sure you want to reject this job?
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant="info">
          <AlertCircle className="h-4 w-4" />

          <AlertDescription>
            If you think some small modification is needed in the job details,
            send message to the job posters to make the changes. The message you
            type here will be sent to the job poster.
          </AlertDescription>
        </Alert>
        <Textarea
          value={changeMessage}
          onChange={(e) => setChangeMessage(e.target.value)}
          className="resize-none"
          placeholder="Enter Message....."
        />
        <ResponsiveModalFooter>
          <div className="w-full flex gap-5 flex-col md:flex-row">
            <Button
              disabled={loading}
              onClick={() => setOpen(false)}
              className="w-full "
              variant={"secondary"}
            >
              Cancel
            </Button>
            <LoadingButton
              disabled={changeMessage.length === 0}
              showIconOnly
              loading={loading}
              onClick={() => handleStatusChange()}
              className="w-full"
            >
              Send
            </LoadingButton>
          </div>
        </ResponsiveModalFooter>
        <p className="text-sm text-muted-foreground text-center">
          You are asking the change for the job with title:
          <span className="text-foreground ml-1">{job.title} </span>
        </p>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default NeedReviewJobModal;

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
import updateJobStatusAdmin from "@/hooks/use-actions/ueUpdateJobStatusAdmin";
import { JobServerDataAdmin } from "@/lib/prisma-types/Job";
import { AlertCircle } from "lucide-react";

interface AcceptJobProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  job: JobServerDataAdmin;
}
const AcceptJobModal = ({ job, open, setOpen }: AcceptJobProps) => {
  const { handleStatusChange, loading } = updateJobStatusAdmin({
    jobId: job.id,
    newStatus: "APPROVED",
    setOpen,
  });
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        isloading={loading}
        className="space-y-5 md:space-y-0"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Accept Job?</ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Are you sure you want to accept this job?
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant="info">
          <AlertCircle className="h-4 w-4" />

          <AlertDescription>
            By accepting this job, you'll mark it as active and make it visible
            to candidates. Please confirm that all job details are correct
            before proceeding.
          </AlertDescription>
        </Alert>
        <ResponsiveModalFooter>
          <Button
            disabled={loading}
            onClick={() => setOpen(false)}
            className="w-full "
            variant={"secondary"}
          >
            Cancel
          </Button>
          <LoadingButton
            showIconOnly
            loading={loading}
            onClick={() => handleStatusChange()}
            className="w-full"
          >
            Accept & Publish
          </LoadingButton>
        </ResponsiveModalFooter>
        <p className="text-sm text-muted-foreground text-center">
          You are accepting job with title:
          <span className="text-foreground ml-1">{job.title}</span>
        </p>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default AcceptJobModal;

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
import { JobServerDataAdmin } from "@/lib/prisma-types/Job";
import { AlertCircle } from "lucide-react";

interface RejectJobProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  job: JobServerDataAdmin;
}
const RejectJobModal = ({ job, open, setOpen }: RejectJobProps) => {
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="space-y-5 md:space-y-0">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Reject Job?</ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Are you sure you want to reject this job?
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />

          <AlertDescription>
            Rejecting this job will permanently mark it as 'Rejected' and remove
            it from active processes. This action cannot be undone. Please
            provide any comments or rationale as needed.
          </AlertDescription>
        </Alert>
        <Textarea
          className="resize-none"
          placeholder="Rejection Message....."
        />
        <ResponsiveModalFooter>
          <Button
            // disabled={isPending}
            onClick={() => setOpen(false)}
            className="w-full "
            variant={"secondary"}
          >
            Cancel
          </Button>
          <LoadingButton
            showIconOnly
            loading={false}
            // loading={isPending}
            // onClick={() => saveJobAs(JobStatus.PENDING)}
            className="w-full"
          >
            Reject
          </LoadingButton>
        </ResponsiveModalFooter>
        <p className="text-sm text-muted-foreground text-center">
          You are rejecting job with title:
          <span className="text-foreground ml-1">{job.title}</span>
        </p>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default RejectJobModal;

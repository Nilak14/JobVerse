import { Button } from "../ui/button";
import {
  CheckCircle,
  Cross,
  File,
  FileClock,
  FileUser,
  MoreHorizontal,
  User,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import { isCreatedResume } from "@/lib/utils";
import Link from "next/link";
import UploadedResumeLink from "../Global/UploadedResumeLink";
import { useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import { updateApplicationStatus } from "@/actions/application/updateApplicationStatus";
import { toast } from "sonner";
import LoadingButton from "../ui/loading-button";
import { useRouter } from "next/navigation";
import ScheduledInterviewModal from "./ScheduleInterviewModal";
interface ApplicationEmployerDropdownActionProps {
  application: JobApplicationEmployer;
}
const ApplicationEmployerDropdownAction = ({
  application,
}: ApplicationEmployerDropdownActionProps) => {
  const userResume = application.resumeId;
  const isResumeCreated = isCreatedResume(userResume || "");
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openScheduledInterviewModal, setOpenScheduledInterviewModal] =
    useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {application.jobSeeker.JobSeekerProfile?.profileVisibility && (
            <DropdownMenuItem>
              <User />
              <span>View Profile</span>
            </DropdownMenuItem>
          )}
          {application.resumeId && (
            <DropdownMenuItem asChild>
              {isResumeCreated ? (
                <Link
                  target="_blank"
                  href={`/resume/preview/${application.resumeId}`}
                >
                  <FileUser />
                  <span>View Resume</span>
                </Link>
              ) : (
                <UploadedResumeLink
                  className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-muted"
                  resumeId={application.resumeId}
                >
                  <FileUser />
                  <span>View Resume</span>
                </UploadedResumeLink>
              )}
            </DropdownMenuItem>
          )}
          {application.status === "PENDING" && (
            <DropdownMenuItem
              onClick={() => setOpenScheduledInterviewModal(true)}
            >
              <FileClock />
              <span>Schedule Interview</span>
            </DropdownMenuItem>
          )}
          {application.status !== "REJECTED" && (
            <DropdownMenuItem>
              <CheckCircle />
              <span>Accept Application</span>
            </DropdownMenuItem>
          )}

          {application.status !== "REJECTED" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenRejectModal(true)}
                className="text-red-500"
              >
                <X />
                <span>Reject Application</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <RejectModal
        isOpen={openRejectModal}
        onClose={() => setOpenRejectModal(false)}
        applicationId={application.id}
      />
      <ScheduledInterviewModal
        isOpen={openScheduledInterviewModal}
        onClose={() => setOpenScheduledInterviewModal(false)}
        application={application}
      />
    </>
  );
};
export default ApplicationEmployerDropdownAction;

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
}

const RejectModal = ({ isOpen, onClose, applicationId }: RejectModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onReject = async () => {
    setLoading(true);
    try {
      const res = await updateApplicationStatus(applicationId, "REJECTED");
      if (res.success) {
        router.refresh();
        toast.success("Application Rejected Successfully");
      } else {
        toast.error("Failed to Reject Application");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to Reject Application");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ResponsiveModal open={isOpen} onOpenChange={onClose}>
      <ResponsiveModalContent isloading={loading ? "true" : undefined}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Reject Application?</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Are you sure you want to reject this application?
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter className="flex gap-4 mt-5 md:mt-0">
          <Button
            disabled={loading}
            className="flex-1"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            showIconOnly
            variant={"destructive"}
            className="flex-1"
            onClick={onReject}
          >
            Reject
          </LoadingButton>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

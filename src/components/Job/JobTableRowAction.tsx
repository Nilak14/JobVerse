"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  LucideIcon,
  MessageCircleMore,
  MoreHorizontal,
  Pause,
  PenSquare,
  Repeat,
  ScanEye,
  Slack,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { JobStatus } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import DeleteJobPopover from "@/components/Job/DeleteJobPopover";
import { Card, CardContent } from "../ui/card";
import PauseJobPopover from "./PauseJobPopover";
import JobPreviewModal from "./JobPreviewModal";
import { LinkedInIcon } from "../ui/LinkedinButton";
import { useQueryGetCompanyLinkedinStatus } from "@/hooks/query-hooks/getCompanyLinkedinStatus";
import { useQueryGetCompanySlackStatus } from "@/hooks/query-hooks/getCompanySlackStatus";
import { useActiveCompany } from "@/store/useActiveCompany";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { postToLinkedInWithJobId } from "@/actions/linkedin/createPost";
import { toast } from "sonner";
import LoadingButton from "../ui/loading-button";
import { updateJobSlackStatus } from "@/actions/slack/updateJobSlackStatus";

interface JobTableRowActionProps {
  id: string;
  status: JobStatus;
  TriggerIcon?: LucideIcon;
  message?: string | null;
  companyId?: string;
  isSlackOn: boolean;
  jobTitle?: string;
}

const JobTableRowAction = ({
  message,
  id,
  status,
  TriggerIcon = MoreHorizontal,
  companyId,
  isSlackOn,
  jobTitle,
}: JobTableRowActionProps) => {
  const [openEditWarningDialog, setOpenEditDialog] = useState(false);
  const [openViewMessage, setOpenViewMessage] = useState(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [openPostOnLinkedin, setOpenPostOnLinkedin] = useState(false);
  const [openSlackMessage, setOpenSlackMessage] = useState(false);

  const { data: linkedinStatusData, isLoading: linkedinLoading } =
    useQueryGetCompanyLinkedinStatus(companyId);
  const { data: slackStatusData, isLoading: slackLoading } =
    useQueryGetCompanySlackStatus(companyId);

  // Check if LinkedIn is valid (has access token and not expired)
  const isLinkedInValid =
    linkedinStatusData?.data?.accessToken &&
    new Date(linkedinStatusData?.data?.expiresAt) > new Date();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center"
          asChild
        >
          <button className="h-8 w-8 p-0 outline-none border-none ring-0">
            <span className="sr-only">Open menu</span>
            <TriggerIcon className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenPreviewDialog(true)}>
            <ScanEye color="orange" className="h-4 w-4 mr-2 " />
            <span>Preview</span>
          </DropdownMenuItem>
          {status === "ACTIVE" && (
            <>
              <DropdownMenuItem asChild>
                <PauseJobPopover jobId={id} />
              </DropdownMenuItem>

              {/* Show LinkedIn option only if valid */}
              {isLinkedInValid && (
                <DropdownMenuItem onClick={() => setOpenPostOnLinkedin(true)}>
                  <LinkedInIcon />
                  <span>Post On LinkedIn</span>
                </DropdownMenuItem>
              )}

              {slackStatusData?.data && (
                <DropdownMenuItem onClick={() => setOpenSlackMessage(true)}>
                  <Slack className="h-4 w-4 mr-2" />
                  <span>
                    {isSlackOn
                      ? "Disable Slack Messages"
                      : "Enable Slack Messages"}
                  </span>
                </DropdownMenuItem>
              )}
            </>
          )}
          {status === "PENDING" && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/employer/job-studio/?jobId=${id}`}>
                  <PenSquare color="#10b981" className="h-4 w-4 mr-2 " />
                  <span>Edit Job</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <>
            {status === "DRAFT" && (
              <>
                <DropdownMenuItem asChild>
                  <Link href={`/employer/job-studio/?jobId=${id}`}>
                    <PenSquare color="#10b981" className="h-4 w-4 mr-2 " />
                    <span>Edit Job</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <DeleteJobPopover jobId={id} />
                </DropdownMenuItem>
              </>
            )}
          </>
          {status === "NEED_REVIEW" && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/employer/job-studio/?jobId=${id}`}>
                  <PenSquare color="#10b981" className="h-4 w-4 mr-2 " />
                  <span>Edit Job</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenViewMessage(true)}>
                <MessageCircleMore color="#ef4444 " className="h-4 w-4 mr-2" />
                <span>View Message</span>
              </DropdownMenuItem>
            </>
          )}
          {status === "REJECTED" && (
            <>
              <DropdownMenuItem onClick={() => setOpenViewMessage(true)}>
                <MessageCircleMore color="#ef4444 " className="h-4 w-4 mr-2" />
                <span>View Message</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <EditJobWarningDialog
        jobId={id}
        open={openEditWarningDialog}
        setOpen={setOpenEditDialog}
      />

      <ViewMessage
        status={status}
        message={message || ""}
        jobId={id}
        open={openViewMessage}
        setOpen={setOpenViewMessage}
      />

      {/* LinkedIn Post Confirmation Modal */}
      <LinkedInPostModal
        jobTitle={jobTitle || ""}
        jobId={id}
        open={openPostOnLinkedin}
        setOpen={setOpenPostOnLinkedin}
      />

      {/* Slack Toggle Confirmation Modal */}
      <SlackToggleModal
        jobId={id}
        open={openSlackMessage}
        setOpen={setOpenSlackMessage}
        isSlackOn={isSlackOn}
      />

      {openPreviewDialog && (
        <JobPreviewModal
          jobId={id}
          open={openPreviewDialog}
          setOpen={setOpenPreviewDialog}
        />
      )}
    </>
  );
};
export default JobTableRowAction;

const EditJobWarningDialog = ({
  jobId,
  setOpen,
  open,
}: {
  jobId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="space-y-5 md:space-y-0 overflow-x-hidden">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Edit Job?</ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Edit Job
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Any modifications made to this job post will automatically set its
            status to 'In-Draft' and require re-review by the JobVerse team
            before it goes live again.
          </AlertDescription>
        </Alert>
        <ResponsiveModalFooter>
          <Button
            onClick={() => setOpen(false)}
            className="w-full mb-5 md:mb-0"
            variant={"secondary"}
          >
            Cancel
          </Button>
          <Button className="w-full mb-5 md:mb-0" asChild>
            <Link href={`/employer/job-studio/?jobId=${jobId}`}>Edit</Link>
          </Button>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

const ViewMessage = ({
  jobId,
  setOpen,
  open,
  message,
  status,
}: {
  jobId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  status: JobStatus;
}) => {
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="space-y-5 md:space-y-0">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            {status === "NEED_REVIEW"
              ? "Need Update For Your Job Post"
              : "Job Post Rejected"}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            {status === "NEED_REVIEW"
              ? " JobVerse wants you to update the job post with following details before it goes live. Update these changes and send for review again"
              : " JobVerse has rejected your job post with following details."}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant={status === "NEED_REVIEW" ? "warning" : "destructive"}>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {status === "NEED_REVIEW"
                ? " JobVerse wants you to update the job post with following details before it goes live. Update these changes and send for review again"
                : " JobVerse has rejected your job post with following details."}
            </AlertDescription>
          </div>
        </Alert>
        <Card>
          <CardContent className="p-5">
            <p>{message}</p>
          </CardContent>
        </Card>
        {status === "NEED_REVIEW" && (
          <ResponsiveModalFooter>
            <div className="w-full flex items-center gap-5 ">
              <Button
                className="flex-1"
                variant={"secondary"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button asChild className="flex-1">
                <Link href={`/employer/job-studio/?jobId=${jobId}`}>
                  <span>Edit Job</span>
                </Link>
              </Button>
            </div>
          </ResponsiveModalFooter>
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

// LinkedIn Post Confirmation Modal
const LinkedInPostModal = ({
  jobId,
  setOpen,
  open,
  jobTitle,
}: {
  jobId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  jobTitle: string;
}) => {
  // Function to handle LinkedIn post
  const { activeCompany } = useActiveCompany();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string>(
    `We're hiring! Check out this ${jobTitle} position at ${activeCompany.name}. Apply here: https://www.jobverse.me/job/description/${jobId}`
  );
  useEffect(() => {
    if (open === false) {
      setCaption(
        `We're hiring! Check out this ${jobTitle} position at ${activeCompany.name}. Apply here: https://www.jobverse.me/job/description/${jobId}`
      );
    }
  }, [open]);
  const handleLinkedInPost = async () => {
    try {
      setLoading(true);
      const res = await postToLinkedInWithJobId(caption, jobId);
      if (res.success) {
        toast.success(res.message || "Post Created successfully", {
          description: "Your job post has been shared on LinkedIn.",
          id: "linkedin-post",
        });
        setOpen(false);
      } else {
        toast.error(res.message || "Something went wrong", {
          description: "Failed to create post on LinkedIn.",
          id: "linkedin-post",
        });
      }
    } catch (error) {
      toast.error("An error occurred while posting to LinkedIn.", {
        description: "Please try again later.",
        id: "linkedin-post",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        isloading={loading ? "true" : undefined}
        className="space-y-5 md:space-y-0"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Post Job to LinkedIn</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Are you sure you want to share this job posting on your company's
            LinkedIn page?
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant="info">
          <div className="flex items-center gap-2">
            <LinkedInIcon />
            <AlertDescription>
              This will create a post on your company's LinkedIn page with
              details about this job opening.
            </AlertDescription>
          </div>
        </Alert>
        <Label>Enter Caption To Post In Linkedin</Label>
        <Textarea
          className="resize-none h-[200px]"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <ResponsiveModalFooter>
          <div className="w-full flex items-center gap-5 ">
            <Button
              className="flex-1"
              variant={"secondary"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              className="flex-1"
              onClick={handleLinkedInPost}
            >
              Post to LinkedIn
            </LoadingButton>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

// Slack Toggle Confirmation Modal
const SlackToggleModal = ({
  jobId,
  setOpen,
  open,
  isSlackOn,
}: {
  jobId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  isSlackOn: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  // Function to toggle Slack
  const handleSlackToggle = async () => {
    try {
      setLoading(true);
      const res = await updateJobSlackStatus({ jobId, newStatus: !isSlackOn });
      if (res.success) {
        toast.success(res.message || "Slack status updated successfully", {
          description: isSlackOn
            ? "You will no longer receive Slack notifications about applications for this job."
            : "You will receive Slack notifications whenever someone applies for this job.",
          id: "slack-toggle",
        });
        setOpen(false);
      } else {
        toast.error(res.message || "Something went wrong", {
          description: "Failed to update Slack status.",
          id: "slack-toggle",
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating Slack status.", {
        description: "Please try again later.",
        id: "slack-toggle",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        isloading={loading ? "true" : undefined}
        className="space-y-5 md:space-y-0"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            {isSlackOn
              ? "Disable Slack Notifications"
              : "Enable Slack Notifications"}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            {isSlackOn
              ? "Are you sure you want to disable Slack notifications for this job?"
              : "Are you sure you want to enable Slack notifications for this job?"}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant={isSlackOn ? "warning" : "info"}>
          <div className="flex items-center gap-2">
            <Slack className="h-4 w-4" />
            <AlertDescription>
              {isSlackOn
                ? "You will no longer receive Slack notifications about applications for this job."
                : "You will receive Slack notifications whenever someone applies for this job."}
            </AlertDescription>
          </div>
        </Alert>
        <ResponsiveModalFooter>
          <div className="w-full flex items-center gap-5 ">
            <Button
              className="flex-1"
              variant={"secondary"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              className="flex-1"
              variant={isSlackOn ? "destructive" : "default"}
              onClick={handleSlackToggle}
            >
              {isSlackOn ? "Disable" : "Enable"}
            </LoadingButton>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

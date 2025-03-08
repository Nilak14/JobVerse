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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

interface JobTableRowActionProps {
  id: string;
  status: JobStatus;
  TriggerIcon?: LucideIcon;
  message?: string | null;
}

const JobTableRowAction = ({
  message,
  id,
  status,
  TriggerIcon = MoreHorizontal,
}: JobTableRowActionProps) => {
  const [openEditWarningDialog, setOpenEditDialog] = useState(false);
  const [openViewMessage, setOpenViewMessage] = useState(false);
  if (status === "PAUSED" || status === "EXPIRED") {
    return <></>;
  }
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
          {status === "ACTIVE" && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/job/description/${id}`}>
                  <ScanEye color="orange" className="h-4 w-4 mr-2 " />
                  <span>Preview</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <PauseJobPopover jobId={id} />
              </DropdownMenuItem>
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

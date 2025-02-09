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
  MoreHorizontal,
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

interface JobTableRowActionProps {
  id: string;
  status: JobStatus;
  TriggerIcon?: LucideIcon;
}

const JobTableRowAction = ({
  id,
  status,
  TriggerIcon = MoreHorizontal,
}: JobTableRowActionProps) => {
  const router = useRouter();
  const [openEditWarningDialog, setOpenEditDialog] = useState(false);
  const [openDeleteWarningDialog, setOpenDeleteDialog] = useState(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
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
          {/* // preview job */}
          <DropdownMenuItem onClick={() => setOpenPreviewDialog(true)}>
            <ScanEye color="orange" className="h-4 w-4 mr-2 " />
            <span>Preview</span>
          </DropdownMenuItem>
          {/* // edit job */}
          {status === "DRAFT" ? (
            <DropdownMenuItem asChild>
              <Link href={`/employer/job-studio/?jobId=${id}`}>
                <PenSquare color="#10b981" className="h-4 w-4 mr-2 " />
                <span>Edit Job</span>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                setOpenEditDialog(true);
              }}
            >
              <PenSquare color="#10b981" className="h-4 w-4 mr-2 " />
              <span>Edit Job</span>
            </DropdownMenuItem>
          )}
          {/* delete job */}
          <DropdownMenuItem asChild>
            <DeleteJobPopover jobId={id} />
          </DropdownMenuItem>
          {/* // change job status */}
          <DropdownMenuItem onClick={() => setOpenStatusDialog(true)}>
            <Repeat color="#3b82f6" className="h-4 w-4 mr-2" />
            <span>Change Job Status</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditJobWarningDialog
        jobId={id}
        open={openEditWarningDialog}
        setOpen={setOpenEditDialog}
      />
      <ChangeJobStatusDialog
        jobId={id}
        open={openStatusDialog}
        setOpen={setOpenStatusDialog}
      />

      <PreviewJobDialog
        jobId={id}
        open={openPreviewDialog}
        setOpen={setOpenPreviewDialog}
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
const ChangeJobStatusDialog = ({
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
      <ResponsiveModalContent className="space-y-5 md:space-y-0">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Are you sure, You want to Delete ?
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ResponsiveModalDescription className="sr-only">
          Remove Members From
        </ResponsiveModalDescription>

        <div className="flex items-center flex-col">
          <p className="text-sm  mb-2 self-start">
            To Confirm, type "Delete" in the box below
          </p>
        </div>
        <ResponsiveModalFooter></ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

const PreviewJobDialog = ({
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
      <ResponsiveModalContent className="space-y-5 md:space-y-0">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Are you sure, You want to Delete ?
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ResponsiveModalDescription className="sr-only">
          Remove Members From
        </ResponsiveModalDescription>

        <div className="flex items-center flex-col">
          <p className="text-sm  mb-2 self-start">
            To Confirm, type "Delete" in the box below
          </p>
        </div>
        <ResponsiveModalFooter></ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

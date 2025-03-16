"use client";
import { JobStatus } from "@prisma/client";
import {
  CircleCheckBig,
  LucideIcon,
  MessageSquareMore,
  MoreHorizontal,
  OctagonX,
  ScanEye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { JobServerDataAdmin } from "@/lib/prisma-types/Job";
import AcceptJobModal from "../Table/TableActionModals/AcceptJobModal";
import RejectJobModal from "../Table/TableActionModals/RejectJobModal";
import NeedReviewJobModal from "../Table/TableActionModals/NeedReviewJobModal";
import JobPreviewModal from "./JobPreviewModal";
interface JobTableRowActionAdminProps {
  status: JobStatus;
  job: JobServerDataAdmin;
  TriggerIcon?: LucideIcon;
}
const JobTableRowActionAdmin = ({
  job,
  status,
  TriggerIcon = MoreHorizontal,
}: JobTableRowActionAdminProps) => {
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openNeedReviewDialog, setOpenNeedReviewDialog] = useState(false);
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
          {/* // accept job */}
          {status === "PENDING" && (
            <DropdownMenuItem onClick={() => setOpenAcceptDialog(true)}>
              <CircleCheckBig color="#10b981 " className="h-4 w-4 mr-2  " />
              <span>Accept</span>
            </DropdownMenuItem>
          )}

          {/* // reject job */}
          {status === "PENDING" && (
            <DropdownMenuItem onClick={() => setOpenRejectDialog(true)}>
              <OctagonX color="red" className="h-4 w-4 mr-2  " />
              <span>Reject</span>
            </DropdownMenuItem>
          )}
          {/* // ask for change in job */}
          {status === "PENDING" && (
            <DropdownMenuItem onClick={() => setOpenNeedReviewDialog(true)}>
              <MessageSquareMore color="#3b82f6 " className="h-4 w-4 mr-2  " />
              <span>Ask For Changes</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AcceptJobModal
        job={job}
        open={openAcceptDialog}
        setOpen={setOpenAcceptDialog}
      />
      <RejectJobModal
        job={job}
        open={openRejectDialog}
        setOpen={setOpenRejectDialog}
      />
      <NeedReviewJobModal
        job={job}
        open={openNeedReviewDialog}
        setOpen={setOpenNeedReviewDialog}
      />
      {openPreviewDialog && (
        <JobPreviewModal
          jobId={job.id}
          open={openPreviewDialog}
          setOpen={setOpenPreviewDialog}
        />
      )}
    </>
  );
};
export default JobTableRowActionAdmin;

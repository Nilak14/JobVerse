"use client";
import { ResumeServerData } from "@/lib/prisma-types/Resume";
import Link from "next/link";
import ResumePreview from "./ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { useRef, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCreatedResume } from "@/actions/resume/deleteCreatedResume";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Download, MoreVertical, Trash2 } from "lucide-react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import LoadingButton from "../ui/loading-button";
import { useReactToPrint } from "react-to-print";
interface CreatedResumeCardProps {
  resume: ResumeServerData;
}
const CreatedResumeCard = ({ resume }: CreatedResumeCardProps) => {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Untitled Resume",
  });

  return (
    <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3 ">
      <div className="space-y-3">
        <Link
          className="inline-block w-full text-center"
          href={`/job-seeker/resume-editor?id=${resume.id}`}
        >
          <p className="font-semibold line-clamp-1">
            {resume.title || "Untitled Resume"}
          </p>
          {resume.description && (
            <p className="text-sm line-clamp-2">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {new Date(resume.updatedAt).toLocaleDateString()}
          </p>
        </Link>
        <Link
          className="inline-block w-full relative "
          href={`/job-seeker/resume-editor?id=${resume.id}`}
        >
          <ResumePreview
            contentRef={contentRef}
            className="shadow-sm group-hover:shadow-lg transition-shadow overflow-hidden"
            resumeDate={mapToResumeValues(resume)}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <ResumeMenu onPrintClick={reactToPrintFn} resumeId={resume.id} />
    </div>
  );
};
export default CreatedResumeCard;

interface ResumeMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

function ResumeMenu({ resumeId, onPrintClick }: ResumeMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4 text-red-500" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onPrintClick}
            className="flex items-center gap-2"
          >
            <Download className="size-4 text-emerald-500 " />
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        const res = await deleteCreatedResume(resumeId);
        if (res.success) {
          toast.success(res.message, { id: "resume-delete" });
        } else {
          toast.error(res.message, { id: "resume-delete" });
        }
        onOpenChange(false);
      } catch (error) {
        toast.error("Failed to delete resume", { id: "resume-delete" });
      }
    });
  }

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent isloading={isPending ? "true" : undefined}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Delete resume?</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter>
          <div className="w-full flex flex-col gap-4 mt-4 sm:flex-row">
            <LoadingButton
              className="flex-1"
              variant="destructive"
              onClick={handleDelete}
              loading={isPending}
              showIconOnly
            >
              Delete
            </LoadingButton>
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

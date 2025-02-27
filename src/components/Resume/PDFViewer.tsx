"use client";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Link from "next/link";
import ResumeStudioSkeleton from "../skeletons/ResumeSkeleton";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import LoadingButton from "../ui/loading-button";
import { toast } from "sonner";
import { deleteUploadedResume } from "@/actions/resume/deleteUploadedResume";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

export const dynamic = "force-dynamic";

interface PDFViewerProps {
  pdfUrl: string;
  uploadedAt: Date;
  id: string;
}
const PDFViewer = ({ id, pdfUrl, uploadedAt }: PDFViewerProps) => {
  return (
    <>
      <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3 ">
        <div className="space-y-3">
          <Link
            target="_blank"
            className="inline-block w-full text-center"
            href={pdfUrl}
          >
            <p className="font-semibold line-clamp-1">
              {/* {resume.title || "Untitled Resume"} */}
            </p>

            <p className="text-xs text-muted-foreground">
              Uploaded on {new Date(uploadedAt).toLocaleDateString()}
            </p>
          </Link>
          <Link
            target="_blank"
            className="inline-block w-full relative "
            href={pdfUrl}
          >
            <Document
              options={options}
              file={pdfUrl}
              loading={<ResumeStudioSkeleton total={1} />}
              error={<div className="error">Failed to load PDF</div>}
            >
              <Page
                width={250}
                height={250}
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
          </Link>
        </div>
        <UploadedResumeMenu resumeId={id} />
      </div>
    </>
  );
};
export default PDFViewer;

interface UploadedResumeMenuProps {
  resumeId: string;
}

function UploadedResumeMenu({ resumeId }: UploadedResumeMenuProps) {
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
        const res = await deleteUploadedResume(resumeId);
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

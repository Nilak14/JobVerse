"use client";

import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UploadResumeButton = ({}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { startUpload } = useUploadThing("pdfResume", {
    onBeforeUploadBegin(file) {
      toast.loading("Uploading resume...", { id: "upload-resume" });
      return file;
    },
    onClientUploadComplete: () => {
      toast.success("Resume uploaded successfully", { id: "upload-resume" });
      router.refresh();
    },
    onUploadError: (error) => {
      console.log(error);
      toast.error("Could not upload resume at this moment, Please try again", {
        id: "upload-resume",
      });
    },
  });
  return (
    <>
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Upload className="size-4" />
        Upload Resume
      </Button>
      <input
        type="file"
        accept="application/pdf"
        multiple
        ref={fileInputRef}
        className="hidden sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            await startUpload([file]);
          }
        }}
      />
    </>
  );
};
export default UploadResumeButton;

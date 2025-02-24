import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export interface Avatar {
  file: File;
  isUploading: boolean;
}
export const useAvatarUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<number>();
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("avatar", {
    onUploadProgress(p) {
      console.log(p);
      setUploadProgress(p);
    },
    onUploadError: () => {
      toast.error("Could not upload avatar at this moment, Please try again", {
        id: "upload-avatar",
      });
    },
    onClientUploadComplete: () => {
      router.refresh();
      toast.success("Avatar uploaded successfully", { id: "upload-avatar" });
    },
  });
  return { startUpload, isUploading, uploadProgress };
};

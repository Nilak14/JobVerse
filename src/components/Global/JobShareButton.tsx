"use client";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface JobShareButtonProps {
  jobId: string;
}
const JobShareButton = ({ jobId }: JobShareButtonProps) => {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_BASE_URL}/job/description${jobId}`
        );
        toast.success("Link copied to clipboard", {
          position: "top-right",
        });
      }}
      variant="outline"
      className="flex-1 flex justify-center items-center gap-2"
    >
      <Share2 size={16} />
      Share
    </Button>
  );
};
export default JobShareButton;

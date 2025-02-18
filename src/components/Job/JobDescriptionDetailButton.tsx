"use client";
import { Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { JobDataDescription } from "@/lib/prisma-types/Job";

interface JobDescriptionDetailButtonProps {
  job: JobDataDescription;
}
const JobDescriptionDetailButton = ({
  job,
}: JobDescriptionDetailButtonProps) => {
  return (
    <>
      <Button className="w-full" size="lg">
        Apply Now
      </Button>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 flex justify-center items-center gap-2"
        >
          <Heart size={16} />
          Save
        </Button>
        <Button
          variant="outline"
          className="flex-1 flex justify-center items-center gap-2"
        >
          <Share2 size={16} />
          Share
        </Button>
      </div>
    </>
  );
};
export default JobDescriptionDetailButton;

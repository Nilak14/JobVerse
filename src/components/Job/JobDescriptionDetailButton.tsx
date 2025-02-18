"use client";
import { Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { JobDataDescription } from "@/lib/prisma-types/Job";
import SaveJobButton from "../Global/SaveJobButton";

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
        <SaveJobButton
          withText
          className="border border-input bg-background shadow-sm hover:bg-accent  flex-1 inline-flex items-center justify-center gap-2  active:scale-95 transition-all duration-300 whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        />
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

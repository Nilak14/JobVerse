"use client";
import useDimensions from "@/hooks/custom-hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useRef } from "react";
import ResumeTemplate1 from "./templates/Template1/ResumeTemplate1";

interface ResumePreviewProps {
  resumeDate: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
const ResumePreview = ({
  resumeDate,
  className,
  contentRef,
}: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(
    containerRef as React.RefObject<HTMLDivElement>
  );
  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
    >
      <div
        ref={contentRef}
        id="resumePreviewContent"
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <ResumeTemplate1 resumeData={resumeDate} />
      </div>
    </div>
  );
};
export default ResumePreview;

"use client";
import useDimensions from "@/hooks/custom-hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useRef } from "react";
import ModernTemplate from "./templates/modern-template/ModernTemplate";
import ProfessionalTemplate from "./templates/professional-template/ProfessionalTemplate";

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
        className={cn("space-y-3 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        {resumeDate.templateId === "modern" && (
          <ModernTemplate resumeData={resumeDate} />
        )}
        {resumeDate.templateId === "professional" && (
          <ProfessionalTemplate resumeData={resumeDate} />
        )}
      </div>
    </div>
  );
};
export default ResumePreview;

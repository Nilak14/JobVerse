import { ResumeValues } from "@/schema/ResumeEditorSchema";
import ResumePreview from "./ResumePreview";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";
import ChangeTemplateButton from "./ChangeTemplateButton";

interface ResumePreviewSectionProps {
  resumeDate: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}
const ResumePreviewSection = ({
  resumeDate,
  setResumeData,
  className,
}: ResumePreviewSectionProps) => {
  return (
    <div
      className={cn("group relative hidden md:w-1/2 md:flex w-full", className)}
    >
      <div className=" opacity-40 xl:opacity-100 group-hover:opacity-100 transition-opacity absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeDate.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeDate, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeDate.borderStyle}
          onChange={(style) =>
            setResumeData({ ...resumeDate, borderStyle: style })
          }
        />
        <ChangeTemplateButton selectedTemplate={resumeDate.templateId} />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeDate={resumeDate}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};
export default ResumePreviewSection;

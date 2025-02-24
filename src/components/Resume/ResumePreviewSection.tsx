import { ResumeValues } from "@/schema/ResumeEditorSchema";
import ResumePreview from "./ResumePreview";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";

interface ResumePreviewSectionProps {
  resumeDate: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}
const ResumePreviewSection = ({
  resumeDate,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return (
    <div className=" group relative hidden w-1/2 md:flex ">
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

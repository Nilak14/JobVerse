import { ResumeTemplateProps } from "@/lib/types";

const SummarySection = ({ resumeData }: ResumeTemplateProps) => {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <div className="break-inside-avoid">
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Summary
        </p>
        <hr style={{ borderColor: colorHex }} className="border mt-1 mb-3" />
        <div>
          <div className="whitespace-pre-line text-sm">{summary}</div>
        </div>
      </div>
    </>
  );
};
export default SummarySection;

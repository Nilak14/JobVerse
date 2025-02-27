import { ResumeTemplateProps } from "@/lib/types";

const SummarySection = ({ resumeData }: ResumeTemplateProps) => {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3 break-inside-avoid">
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Professional Profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
};
export default SummarySection;

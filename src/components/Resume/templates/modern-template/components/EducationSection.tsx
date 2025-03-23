import { ResumeTemplateProps } from "@/lib/types";
import { formatDate } from "date-fns";

const EducationSection = ({ resumeData }: ResumeTemplateProps) => {
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3">
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              style={{ color: colorHex }}
              className="flex items-center justify-between text-xs font-semibold"
            >
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default EducationSection;

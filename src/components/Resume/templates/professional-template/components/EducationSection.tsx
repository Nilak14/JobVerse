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
      <div>
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Education
        </p>
        <hr style={{ borderColor: colorHex }} className="border mt-1 mb-3" />
        <div className="space-y-2">
          {educationsNotEmpty.map((edu, index) => (
            <div key={index} className="break-inside-avoid">
              <div className="flex items-center justify-between text-sm font-semibold ">
                <span>{edu.degree}</span>
                {edu.startDate && (
                  <span className="text-xs text-gray-500">
                    {edu.startDate &&
                      `${formatDate(edu.startDate, "yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "yyyy")}` : ""}`}
                  </span>
                )}
              </div>
              <p className="text-xs  text-gray-500">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default EducationSection;

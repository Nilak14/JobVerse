import { ResumeTemplateProps } from "@/lib/types";
import { formatDate } from "date-fns";

const WorkExperienceSection = ({ resumeData }: ResumeTemplateProps) => {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <div>
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Experience
        </p>
        <hr style={{ borderColor: colorHex }} className="border mt-1 mb-3" />
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="flex items-center justify-between text-sm  font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span className="text-xs text-gray-500">
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}{" "}
                </span>
              )}
            </div>
            <p className="text-xs  text-gray-500 mb-1">{exp.company}</p>
            <div className="whitespace-pre-line mb-3 text-xs">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default WorkExperienceSection;

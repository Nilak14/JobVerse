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
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3">
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Work Experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              style={{ color: colorHex }}
              className="flex items-center justify-between text-xs font-semibold"
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}{" "}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default WorkExperienceSection;

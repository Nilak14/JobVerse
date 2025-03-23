import { ResumeTemplateProps } from "@/lib/types";

const SkillsSection = ({ resumeData }: ResumeTemplateProps) => {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;

  return (
    <>
      <div className="break-inside-avoid">
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Skills
        </p>
        <hr style={{ borderColor: colorHex }} className="border mt-1 mb-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <div
                className="h-1 w-1 aspect-square rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: colorHex }}
              ></div>
              <p className="text-sm font-medium">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default SkillsSection;

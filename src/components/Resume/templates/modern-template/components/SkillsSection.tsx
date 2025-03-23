import { BorderStyles } from "@/components/Resume/BorderStyleButton";
import { Badge } from "@/components/ui/badge";
import { ResumeTemplateProps } from "@/lib/types";

const SkillsSection = ({ resumeData }: ResumeTemplateProps) => {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;

  return (
    <>
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "99999px"
                      : "8px",
              }}
              className="bg-black text-white rounded-md hover:bg-black"
              key={index}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};
export default SkillsSection;

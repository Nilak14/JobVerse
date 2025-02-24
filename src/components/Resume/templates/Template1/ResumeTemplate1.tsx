import { ResumeTemplateProps } from "@/lib/types";
import PersonalInfoHeader from "./components/PersonalInfoHeader";
import SummarySection from "./components/SummarySection";
import WorkExperienceSection from "./components/WorkExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";

const ResumeTemplate1 = ({ resumeData }: ResumeTemplateProps) => {
  return (
    <>
      <PersonalInfoHeader resumeData={resumeData} />
      <SummarySection resumeData={resumeData} />
      <WorkExperienceSection resumeData={resumeData} />
      <EducationSection resumeData={resumeData} />
      <SkillsSection resumeData={resumeData} />
    </>
  );
};
export default ResumeTemplate1;

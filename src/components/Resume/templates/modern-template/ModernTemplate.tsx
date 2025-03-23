import { ResumeTemplateProps } from "@/lib/types";
import PersonalInfoHeader from "./components/PersonalInfoHeader";
import SummarySection from "./components/SummarySection";
import WorkExperienceSection from "./components/WorkExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import CertificationSection from "./components/CertificationSection";

const ModernTemplate = ({ resumeData }: ResumeTemplateProps) => {
  return (
    <>
      <PersonalInfoHeader resumeData={resumeData} />
      <SummarySection resumeData={resumeData} />
      <WorkExperienceSection resumeData={resumeData} />
      <EducationSection resumeData={resumeData} />
      <SkillsSection resumeData={resumeData} />
      <CertificationSection resumeData={resumeData} />
    </>
  );
};
export default ModernTemplate;

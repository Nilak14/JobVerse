import { ResumeTemplateProps } from "@/lib/types";
import PersonalInfoHeader from "@/components/Resume/templates/professional-template/components/PersonalInfoHeader";
import SummarySection from "@/components/Resume/templates/professional-template/components/SummarySection";
import WorkExperienceSection from "@/components/Resume/templates/professional-template/components/WorkExperienceSection";
import EducationSection from "@/components/Resume/templates/professional-template/components/EducationSection";
import SkillsSection from "@/components/Resume/templates/professional-template/components/SkillsSection";
import CertificationSection from "@/components/Resume/templates/professional-template/components/CertificationSection";

const ProfessionalTemplate = ({ resumeData }: ResumeTemplateProps) => {
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
export default ProfessionalTemplate;

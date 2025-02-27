import EducationForm from "@/components/Forms/ResumeEditorForms/EducationForm";
import GeneralInfoForm from "@/components/Forms/ResumeEditorForms/GeneralInfoForm";
import PersonalInfoForm from "@/components/Forms/ResumeEditorForms/PersonalInfoForm";
import SkillsForm from "@/components/Forms/ResumeEditorForms/SkillsForm";
import SummaryForm from "@/components/Forms/ResumeEditorForms/SummaryForm";
import WorkExperienceForm from "@/components/Forms/ResumeEditorForms/WorkExperienceForm";
import { ResumeEditorFormProps } from "../types";

export const ResumeEditorFormSteps: {
  title: string;
  component: React.ComponentType<ResumeEditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];

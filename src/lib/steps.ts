import PersonalInfoForm from "@/components/Forms/onboardingForms/jobSeeker/PersonalInfoForm";
import { OnBoardingStep } from "./types";
import EducationalForm from "@/components/Forms/onboardingForms/jobSeeker/EducationalForm";

export const job_seeker_onboarding_steps: OnBoardingStep[] = [
  {
    title: "Personal Info",
    key: "personal-info",
    component: PersonalInfoForm,
  },
  {
    title: "Educational Background",
    key: "educational-background",
    component: EducationalForm,
  },
  {
    title: "Work Experience ",
    key: "work-experience",
    component: PersonalInfoForm,
  },
  {
    title: "Job Preferences ",
    key: "job-preferences",
    component: PersonalInfoForm,
  },
];

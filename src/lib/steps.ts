import PersonalInfoForm from "@/components/Forms/onboardingForms/jobSeeker/PersonalInfoForm";
import { OnBoardingStep } from "./types";
import WorkExperienceForm from "@/components/Forms/onboardingForms/jobSeeker/WorkExperienceForm";

export const job_seeker_onboarding_steps: OnBoardingStep[] = [
  {
    title: "Personal Info",
    key: "personal-info",
    component: PersonalInfoForm,
  },
  {
    title: "Work Experience ",
    key: "work-experience",
    component: WorkExperienceForm,
  },
  {
    title: "Job Preferences ",
    key: "job-preferences",
    component: PersonalInfoForm,
  },
];

import PersonalInfoForm from "@/components/Forms/onboardingForms/jobSeeker/PersonalInfoForm";
import { OnBoardingStep } from "./types";

export const job_seeker_onboarding_steps: OnBoardingStep[] = [
  {
    title: "Personal Information",
    key: "personal-information",
    component: PersonalInfoForm,
  },
];

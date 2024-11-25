import { JobSeekerOnboardingSchema } from "@/schema/JobSeekerOnboardingSchema";

export interface OnBoardingStep {
  title: string;
  component: React.ComponentType<{ setCurrentStep: (step: string) => void }>;
  key: string;
}

export interface JobSeekerOnboardingFormProps {
  jobSeekerFormData: JobSeekerOnboardingSchema;
  setJobSeekerFormData: React.Dispatch<
    React.SetStateAction<JobSeekerOnboardingSchema>
  >;
}

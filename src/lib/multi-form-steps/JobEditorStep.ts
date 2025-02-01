import JobBasicsForm from "@/components/Forms/JobEditorForms/JobBasicsForm";
import JobDetailsForm from "@/components/Forms/JobEditorForms/JobDetailsForm";
import React from "react";
import { JobEditorFormProps } from "../types";
import JobBenefitsForm from "@/components/Forms/JobEditorForms/JobBenefitsForm";
import JobDescriptionForm from "@/components/Forms/JobEditorForms/JobDescriptionForm";

export const JobEditorFormSteps: {
  title: string;
  component: React.ComponentType<JobEditorFormProps>;
  key: string;
}[] = [
  {
    title: "Job Basics",
    component: JobBasicsForm,
    key: "job-basics",
  },
  {
    title: "Job Details",
    component: JobDetailsForm,
    key: "job-details",
  },
  {
    title: "Job Benefits",
    component: JobBenefitsForm,
    key: "job-benefits",
  },
  {
    title: "Job Description",
    component: JobDescriptionForm,
    key: "job-description",
  },
];

import JobBasicsForm from "@/components/Forms/JobEditorForms/JobBasicsForm";
import JobDetailsForm from "@/components/Forms/JobEditorForms/JobDetailsForm";
import React from "react";
import { JobEditorFormProps } from "../types";
import JobBenefitsForm from "@/components/Forms/JobEditorForms/JobBenefitsForm";
import JobDescriptionForm from "@/components/Forms/JobEditorForms/JobDescriptionForm";
import JobTagForm from "@/components/Forms/JobEditorForms/JobTagsForm";
import JobQualificationForm from "@/components/Forms/JobEditorForms/JobQualificationForm";
import JobSettingForm from "@/components/Forms/JobEditorForms/JobSettingForm";

export const JobEditorFormSteps: {
  title: string;
  component: React.ComponentType<JobEditorFormProps>;
  key: string;
  isLastStep: boolean;
}[] = [
  {
    title: "Job Basics",
    component: JobBasicsForm,
    key: "job-basics",
    isLastStep: false,
  },
  {
    title: "Job Details",
    component: JobDetailsForm,
    key: "job-details",
    isLastStep: false,
  },
  {
    title: "Job Benefits",
    component: JobBenefitsForm,
    key: "job-benefits",
    isLastStep: false,
  },
  {
    title: "Job Tags",
    component: JobTagForm,
    key: "job-tags",
    isLastStep: false,
  },
  {
    title: "Job Qualifications",
    component: JobQualificationForm,
    key: "job-qualifications",
    isLastStep: false,
  },
  {
    title: "Job Description",
    component: JobDescriptionForm,
    key: "job-description",
    isLastStep: false,
  },

  {
    title: "Job Setting",
    component: JobSettingForm,
    key: "job-setting",
    isLastStep: true,
  },
];

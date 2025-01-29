import JobBasicsForm from "@/components/Forms/JobEditorForms/JobBasicsForm";
import JobDetailsForm from "@/components/Forms/JobEditorForms/JobDetailsForm";
import React from "react";
import { JobEditorFormProps } from "../types";

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
];

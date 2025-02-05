import {
  EducationLevel,
  jobTypes,
  LicenseRequired,
  PreferredGender,
  SalaryRate,
  SalaryType,
  VehicleRequired,
  workMode,
} from "@/lib/enums/CreateJobEnums";
import { z } from "zod";
// Job Basic Schema
export const optionalString = z.string().trim().optional().or(z.literal(""));
export const workModeSchema = z.object({
  workMode: optionalString,
  location: optionalString,
});

export const jobBasicsSchema = z
  .object({
    title: optionalString,
    jobType: optionalString,
  })
  .and(workModeSchema);

export type jobBasicsSchemaType = z.infer<typeof jobBasicsSchema>;

// Job Details Schema
export const JobDetailsSchema = z.object({
  category: optionalString,
  subCategory: optionalString,
  experienceLevel: optionalString,
  totalHeads: optionalString,
});
export type JobDetailsSchemaType = z.infer<typeof JobDetailsSchema>;
// Job Benefits Schema

export const SalaryTypeSchema = z.object({
  salaryType: optionalString,
  minSalaryAmount: optionalString.nullable(),
  maxSalaryAmount: optionalString.nullable(),
  amount: optionalString.nullable(),
});

export const JobBenefitsSchema = z
  .object({
    salaryCurrency: optionalString,
    salaryRate: optionalString,
    benefits: z.array(z.string()).optional(),
  })
  .and(SalaryTypeSchema);

export type JobBenefitsSchemaType = z.infer<typeof JobBenefitsSchema>;

// Job Description Schema

export const JobDescriptionSchema = z.object({
  description: optionalString,
});

export type JobDescriptionSchemaType = z.infer<typeof JobDescriptionSchema>;

// Job Tags Type

export const JobTagsSchema = z.object({
  tags: z.array(z.string()).optional(),
});

export type JobTagsSchemaType = z.infer<typeof JobTagsSchema>;

// job qualification types

export const JobQualificationSchema = z.object({
  skills: z.array(z.string()).optional(),
  educationLevel: optionalString,

  preferredGender: optionalString,

  license: optionalString,
  vehicle: optionalString,
});

export type JobQualificationSchemaType = z.infer<typeof JobQualificationSchema>;

// job settings type
export const JobSettingsSchema = z.object({
  resumeRequired: z
    .boolean({ message: "Resume Required should be selected" })
    .optional(),
  getEmailNotification: z
    .boolean({
      message: "Email Notification should be selected",
    })
    .optional(),
  isUrgent: z
    .boolean({
      message: "Urgent is required",
    })
    .optional(),
  applicationDeadline: z.coerce.date().nullable().optional(),
});

export type JobSettingsSchemaType = z.infer<typeof JobSettingsSchema>;

// global schema

export const jobSchema = z
  .object({ id: z.string().optional() })
  .and(jobBasicsSchema)
  .and(JobDetailsSchema)
  .and(JobBenefitsSchema)
  .and(JobDescriptionSchema)
  .and(JobTagsSchema)
  .and(JobQualificationSchema)
  .and(JobSettingsSchema);

export type JobSchemaType = z.infer<typeof jobSchema>;

import {
  EducationLevel,
  JobType,
  jobTypes,
  LicenseRequired,
  PreferredGender,
  SalaryRate,
  SalaryType,
  VehicleRequired,
  WorkMode,
  workMode,
} from "@/lib/enums/CreateJobEnums";
import { z } from "zod";
import { optionalString } from "./ResumeEditorSchema";

// Job Basic Schema
export const workModeSchema = z
  .object({
    workMode: z
      .string()
      .min(1, "Select Atleast One Work Mode")
      .refine((val) => workMode.includes(val as WorkMode), "Invalid Work Mode"),
    location: z.string().trim().max(100).optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
  })
  .refine((data) => data.workMode === "Remote" || !!data.location, {
    message: "Location is required for this work mode",
    path: ["location"],
  });

export const jobBasicsSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, { message: "Title is required" })
      .max(50, { message: "Title should be less than 50 characters" }),

    jobType: z
      .string()
      .min(1, { message: "Job Type is required" })
      .refine((value) => jobTypes.includes(value as JobType), {
        message: "Invalid Job Type",
      }),
  })
  .and(workModeSchema);

export type jobBasicsSchemaType = z.infer<typeof jobBasicsSchema>;

// Job Details Schema
export const JobDetailsSchema = z.object({
  categoryId: z.string().min(1, { message: "Category is required" }),
  subCategoryId: z.string().min(1, { message: "Sub Category is required" }),
  experienceLevel: z
    .string()
    .min(1, { message: "Experience Level is required" }),
  totalHeads: z.string().min(1, { message: "Total Openings is required" }),
});
export type JobDetailsSchemaType = z.infer<typeof JobDetailsSchema>;
// Job Benefits Schema

export const SalaryTypeSchema = z
  .object({
    salaryType: z
      .string()
      .min(1, "Salary Type is Needed")
      .refine(
        (val) => SalaryType.includes(val as SalaryType),
        "Invalid Salary Type"
      ),
    minSalaryAmount: z
      .string()
      .min(1, { message: "Minimum Salary is required" })
      .regex(/^\d+$/, "Value must be greater than 0")
      .nullable(),
    maxSalaryAmount: z
      .string()
      .min(1, { message: "Minimum Salary is required" })
      .regex(/^\d+$/, "Value must be greater than 0")
      .nullable(),
    amount: z
      .string()
      .min(1, { message: " Salary is required" })
      .regex(/^\d+$/, "Value must be greater than 0")
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.salaryType === "Range") {
      if (data.minSalaryAmount === null || Number(data.minSalaryAmount) <= 0) {
        ctx.addIssue({
          path: ["minSalaryAmount"],
          message: "Minimum Salary  must be greater than 0",
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.maxSalaryAmount === null || Number(data.maxSalaryAmount) <= 0) {
        ctx.addIssue({
          path: ["maxSalaryAmount"],
          message: "Maximum Salary  must be greater than 0",
          code: z.ZodIssueCode.custom,
        });
      }
      // max should be greater than min
      if (
        data.minSalaryAmount !== null &&
        data.maxSalaryAmount !== null &&
        Number(data.maxSalaryAmount) <= Number(data.minSalaryAmount)
      ) {
        ctx.addIssue({
          path: ["maxSalaryAmount"],
          message: "Maximum Salary must be greater than Minimum Salary",
          code: z.ZodIssueCode.custom,
        });
      }
      // amount should be null
      if (data.amount !== null) {
        ctx.addIssue({
          path: ["amount"],
          message: "Salary Amount must be null when Salary Type is Range",
          code: z.ZodIssueCode.custom,
        });
      }
    } else {
      // for other types, amount must be greater than 0
      if (data.amount === null || Number(data.amount) <= 0) {
        ctx.addIssue({
          path: ["amount"],
          message: "Salary Amount  must be greater than 0",
          code: z.ZodIssueCode.custom,
        });
      }
      // min and max should be null
      if (data.minSalaryAmount !== null) {
        ctx.addIssue({
          path: ["minSalaryAmount"],
          message: "Minimum Salary must be null when Salary Type is not Range",
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.maxSalaryAmount !== null) {
        ctx.addIssue({
          path: ["maxSalaryAmount"],
          message: "Maximum Salary must be null when Salary Type is not Range",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const JobBenefitsSchema = z
  .object({
    salaryCurrency: z.string().min(1, { message: "Currency Is Required" }),
    salaryRate: z
      .string()
      .min(1, { message: "Salary Rate is required" })
      .refine(
        (val) => SalaryRate.includes(val as SalaryRate),
        "Invalid Salary Type"
      ),
    benefits: z.array(z.string()),
  })
  .and(SalaryTypeSchema);

export type JobBenefitsSchemaType = z.infer<typeof JobBenefitsSchema>;

// Job Description Schema

export const JobDescriptionSchema = z.object({
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" }),
});

export type JobDescriptionSchemaType = z.infer<typeof JobDescriptionSchema>;

// Job Tags Type

export const JobTagsSchema = z.object({
  tags: z
    .array(z.string())
    .min(2, { message: "There should be at least 2 tags selected" })
    .max(15, { message: "You can select at most 15 tags" }),
});

export type JobTagsSchemaType = z.infer<typeof JobTagsSchema>;

// job qualification types

export const JobQualificationSchema = z.object({
  skills: z
    .array(z.string())
    .min(1, { message: "At least one skill is required" }),
  educationLevel: z
    .string()
    .min(1, "Select Education Level")
    .refine((val) => EducationLevel.includes(val), "Invalid Education"),

  preferredGender: z
    .string()
    .min(1, "Select Preferred Gender")
    .refine((val) => PreferredGender.includes(val), "Invalid Gender"),

  license: z
    .string()
    .min(1, "Select Required License")
    .refine((val) => LicenseRequired.includes(val), "Invalid License"),
  vehicle: z
    .string()
    .min(1, "Select Required Vehicle")
    .refine((val) => VehicleRequired.includes(val), "Invalid Vehicle"),
});

export type JobQualificationSchemaType = z.infer<typeof JobQualificationSchema>;

// job settings type
export const JobSettingsSchema = z.object({
  resumeRequired: z.boolean({ message: "Resume Required should be selected" }),
  getEmailNotification: z.boolean({
    message: "Email Notification should be selected",
  }),
  postInLinkedin: z.boolean({
    message: "Post In Linkedin should be selected",
  }),
  linkedinCaption: z.string().optional(),
  isUrgent: z.boolean({
    message: "Urgent is required",
  }),
  applicationDeadline: z.coerce.date().nullable(),
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

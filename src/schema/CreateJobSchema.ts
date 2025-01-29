import { jobTypes, workMode } from "@/lib/enums/CreateJobEnums";
import { z } from "zod";

export const workModeSchema = z
  .object({
    workMode: z
      .string()
      .min(1, "Select Atleast One Work Mode")
      .refine((val) => workMode.includes(val), "Invalid Work Mode"),
    location: z.string().trim().max(100).optional(),
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
      .refine((value) => jobTypes.includes(value), {
        message: "Invalid Job Type",
      }),
  })
  .and(workModeSchema);

export type jobBasicsSchemaType = z.infer<typeof jobBasicsSchema>;

export const JobDetailsSchema = z.object({
  experienceLevel: z
    .string()
    .min(1, { message: "Experience Level is required" }),
  totalHeads: z.string().min(1, { message: "Total Heads is required" }),
});

export type JobDetailsSchemaType = z.infer<typeof JobDetailsSchema>;

// global schema

export const JobSchema = z.intersection(jobBasicsSchema, JobDetailsSchema);

export type JobSchemaType = z.infer<typeof JobSchema> & {
  id?: string;
};

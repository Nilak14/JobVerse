import { z } from "zod";

export const jobBasicsSchema = z.object({
  title: z.string().trim().min(3, { message: "Title is required" }),
  totalHeads: z.string().min(1, { message: "Total Heads is required" }),
  // jobType: Internship, remote, full-time, part-time
  // job location
});

export type jobBasicsSchemaType = z.infer<typeof jobBasicsSchema>;

export const JobDetailsSchema = z.object({
  jobType: z.string().min(1, { message: "Job Type is required" }),
  experienceLevel: z
    .string()
    .min(1, { message: "Experience Level is required" }),
});

export type JobDetailsSchemaType = z.infer<typeof JobDetailsSchema>;

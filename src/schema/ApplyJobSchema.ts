import { z } from "zod";

export const ApplyJobSchema = z.object({
  resumeId: z.string().optional(),
  jobSeekerId: z.string().min(1, { message: "Job Seeker is required" }),
  jobId: z.string().min(1, { message: "Job is required" }),
});
export type ApplyJobSchemaType = z.infer<typeof ApplyJobSchema>;

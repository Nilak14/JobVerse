import { z } from "zod";

export const ScheduleInterviewSchema = z.object({
  applicationId: z.string().min(1),
  interviewDate: z.string().min(1, { message: "Please select a date" }),
  interviewTime: z.string().min(1, { message: "Please select a time" }),
  interviewType: z
    .string()
    .min(1, { message: "Please select an interview type" }),
  note: z.optional(z.string()),
});

export type ScheduleInterviewSchemaType = z.infer<
  typeof ScheduleInterviewSchema
>;

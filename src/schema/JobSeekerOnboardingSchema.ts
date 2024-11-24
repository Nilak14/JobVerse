import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().trim().min(3, "Name must be at least 3 characters"),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

export const jobSeekerOnboardingSchema = z.object({
  ...personalInfoSchema.shape,
});

export type JobSeekerOnboardingSchema = z.infer<
  typeof jobSeekerOnboardingSchema
>;

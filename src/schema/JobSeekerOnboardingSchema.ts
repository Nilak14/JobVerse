import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const today = new Date();
const minDateOfBirth = new Date(
  today.getFullYear() - 16,
  today.getMonth(),
  today.getDate()
);

export const personalInfoSchema = z.object({
  fullName: z.string().trim().min(3, "Name must be at least 3 characters"),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  gender: z.enum(["male", "female", "others"], {
    message: "Invalid Gender",
  }),
  dob: z
    .string()
    .min(1, { message: "Date of Birth is required" })
    .refine(
      (dob) => {
        const date = new Date(dob);
        return date <= minDateOfBirth;
      },
      { message: "Invalid Age" }
    ),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

export const jobPreferenceSchema = z.object({
  jobType: z.enum(["full-time", "part-time", "remote", "internship"], {
    message: "Invalid Job Type",
  }),
  salaryRange: z.string().min(1, "Salary range is required"),
});

export type JobPreferenceSchema = z.infer<typeof jobPreferenceSchema>;
export const jobSeekerOnboardingSchema = z.object({
  ...personalInfoSchema.shape,
  ...jobPreferenceSchema.shape,
});

export type JobSeekerOnboardingSchema = z.infer<
  typeof jobSeekerOnboardingSchema
>;

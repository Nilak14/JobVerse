import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "File must be an image"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "Image must be less than 4MB"
    ),
  fullName: z.string().trim().min(3, "Name must be at least 3 characters"),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

export const jobSeekerOnboardingSchema = z.object({
  ...personalInfoSchema.shape,
});

export type JobSeekerOnboardingSchema = Omit<
  z.infer<typeof jobSeekerOnboardingSchema>,
  "photo"
> & { photo?: File | string | null };

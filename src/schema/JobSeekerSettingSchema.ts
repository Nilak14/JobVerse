import { ins } from "framer-motion/client";
import { title } from "process";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const PersonalInformationSchema = z.object({
  fullName: z.string().min(3, "Name is too short").max(50, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  address: z
    .string()
    .min(3, "Address is too short")
    .max(100, "Address is too long"),
});

export type PersonalInformationSchemaType = z.infer<
  typeof PersonalInformationSchema
>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, "Password is too short"),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export const PrivacySettingSchema = z.object({
  profileVisibility: z.boolean().default(true),
  resumeVisibility: z.boolean().default(true),
});

export const ProfessionalDetailsSchema = z.object({
  designation: z.string().min(3, "Designation is too short"),
  bio: z.string().min(10, "Description is too short"),
  skills: z.array(z.string().min(1, "Skill is too short")),
  workExperience: z.array(
    z.object({
      companyName: z.string().min(3, "Company name is too short"),
      position: z.string().min(3, "Designation is too short"),
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
      // index: z.string(),
      description: z.string().min(10, "Description is too short"),
    })
  ),
  education: z.array(
    z.object({
      degreeTitle: z.string().min(3, "Degree title is too short"),
      institute: z.string().min(3, "Institute name is too short"),
      startDate: z.string().date(),
      endDate: z.date().nullable(),
      index: z.string(),
    })
  ),
  certifications: z.array(
    z.object({
      certificationTitle: z.string().min(3, "Certification title is too short"),
      institute: z.string().min(3, "Institute name is too short"),
      completionDate: z.date(),
      index: z.string(),
    })
  ),
});

export type ProfessionalDetailsSchemaType = z.infer<
  typeof ProfessionalDetailsSchema
>;

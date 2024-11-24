import { z } from "zod";
export const RegisterSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.string().trim().email("Enter a Valid Email Address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    userType: z.enum(["JOB_SEEKER", "COMPANY", "ADMIN"]),

    confirmPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

import { z } from "zod";

// Forget Password Schema
export const ForgetPasswordSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});
export type ForgetPasswordSchemaType = z.infer<typeof ForgetPasswordSchema>;

// Reset or change password schema after forgetting password
export const ResetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

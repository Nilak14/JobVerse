import { z } from "zod";

export const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email is required" })
    .email()
    .trim(),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

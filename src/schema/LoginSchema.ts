import { z } from "zod";

export const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email is required" })
    .email()
    .trim(),
  password: z.string().trim().min(1, { message: "Password is required" }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  code: z
    .string()
    .length(6, { message: "Code must be exactly 6 characters" })
    .optional(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

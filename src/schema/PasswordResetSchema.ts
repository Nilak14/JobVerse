import { z } from "zod";
export const PasswordResetSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});
export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;

import { z } from "zod";

export const InvitationSchema = z.object({
  companyId: z.string().cuid(), // Ensure it's a valid CUID
  inviteeId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type InvitationSchemaType = z.infer<typeof InvitationSchema>;

"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

const action = createSafeActionClient();

export const rejectInvitaion = action
  .schema(z.object({ invitationId: z.string() }))
  .action(async ({ parsedInput: { invitationId } }) => {
    try {
      const session = await auth();
      if (!session || !session.user || session.user.type !== "EMPLOYER") {
        return { success: false, message: "Unauthorized", status: 401 };
      }

      if (session.user.isBlocked) {
        return {
          success: false,
          message: "Your account has been blocked",
          status: 403,
        };
      }

      const invitation = await prisma.invitations.update({
        where: {
          id: invitationId,
        },
        data: {
          status: "REJECTED",
        },
      });
      if (!invitation) {
        return { success: false, message: "Invitation Not Found", status: 404 };
      }
      return {
        success: true,
        message: "Invitation rejected",
        status: 200,
        data: invitation,
      };
    } catch (error) {
      console.log(error);

      return { success: false, message: "Something went wrong", status: 500 };
    }
  });

"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { createSafeActionClient } from "next-safe-action";
import { after } from "next/server";
import { z } from "zod";

const action = createSafeActionClient();

export const acceptInvitation = action
  .schema(
    z.object({
      invitationId: z.string(),
    })
  )
  .action(async ({ parsedInput: { invitationId } }) => {
    try {
      const session = await auth();
      if (!session || !session.user || session.user.type !== "EMPLOYER") {
        return { success: false, message: "Unauthorized", status: 401 };
      }
      if (session.user.isBlocked) {
        signOut();
        return {
          success: false,
          message: "Your account has been blocked",
          status: 403,
        };
      }

      const [invitation, inviteeEmployer] = await Promise.all([
        prisma.invitations.findUnique({
          where: {
            id: invitationId,
          },
          include: {
            company: true,
            invitee: true,
          },
        }),
        prisma.employer.findUnique({
          where: {
            userId: session.user.id,
          },
        }),
      ]);

      // Check if the invitation exists
      if (!invitation) {
        return { success: false, message: "Invitation Not Found", status: 404 };
      }

      // Check if the invitation is still valid
      if (invitation.status !== "PENDING") {
        return {
          success: false,
          message: "Invitation is no longer valid",
          status: 400,
        };
      }

      // Ensure the invitee is authorized to accept the invitation
      if (!inviteeEmployer || inviteeEmployer.id !== invitation.inviteeId) {
        return {
          success: false,
          message: "You are not authorized to accept this invitation",
          status: 401,
        };
      }

      await prisma.company.update({
        where: {
          id: invitation.companyId,
        },
        data: {
          employers: {
            connect: { id: inviteeEmployer.id },
          },
        },
      });

      if (inviteeEmployer.activeCompanyId === null) {
        await prisma.employer.update({
          where: {
            id: inviteeEmployer.id,
          },
          data: {
            activeCompanyId: invitation.companyId,
          },
        });
      }

      after(async () => {
        await prisma.invitations.update({
          where: {
            id: invitationId,
          },
          data: {
            status: "ACCEPTED",
          },
        });
      });

      return {
        success: true,
        message: ` You have successfully joined ${invitation.company.name}`,
        status: 200,
      };
    } catch (error) {
      return { success: false, message: "Something went wrong", status: 500 };
    }
  });

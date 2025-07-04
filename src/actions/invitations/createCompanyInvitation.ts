"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getEmployerPendingInvitations } from "@/lib/prisma-types/Invitations";
import { getPusherInstance } from "@/lib/pusher/server";
import { handleError } from "@/lib/utils";
import { InvitationSchema } from "@/schema/InvitationSchema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();
const pusherServer = getPusherInstance();
export const createInvitation = action
  .schema(InvitationSchema)
  .action(async ({ parsedInput: { companyId, inviteeId, userId } }) => {
    try {
      const session = await auth();
      if (!session || !session.user) {
        return { success: false, message: "Unauthorized Access" };
      }

      if (session.user.id !== userId) {
        return { success: false, message: "Unauthorized Access" };
      }

      const { invitation, inviteeEmployer } = await prisma.$transaction(
        async (prisma) => {
          const employer = await prisma.employer.findFirst({
            where: {
              userId,
            },
          });

          if (!employer) {
            throw new Error("Only employers can create companies");
          }

          const inviteeEmployer = await prisma.employer.findUnique({
            where: {
              id: inviteeId,
            },
            include: {
              companyMemberships: true,
            },
          });
          if (!inviteeEmployer) {
            throw new Error("Employer not found");
          }

          inviteeEmployer.companyMemberships.find((company) => {
            if (company.id === companyId) {
              throw new Error("Employer is already a member of this company");
            }
          });

          const existingInvitation = await prisma.invitations.findFirst({
            where: {
              companyId,
              inviteeId,
              inviterId: employer.id,
              status: {
                not: "REJECTED",
              },
            },
          });
          if (existingInvitation) {
            throw new Error(
              "You have already sent an invitation to this employer"
            );
          }

          const invitation = await prisma.invitations.create({
            data: {
              companyId,
              inviteeId,
              inviterId: employer.id,
            },
            include: getEmployerPendingInvitations(),
          });

          return { employer, invitation, inviteeEmployer };
        }
      );

      if (invitation) {
        await pusherServer.trigger(
          inviteeEmployer.userId,
          "invitation",
          invitation
        );
        return {
          success: true,
          message: "Invitation sent successfully",
        };
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      return handleError({ error, errorIn: "Create Company Invitation" });
    }
  });

"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { InvitationSchema } from "@/schema/InvitationSchema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

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

      const { invitation } = await prisma.$transaction(async (prisma) => {
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
            companies: true,
          },
        });
        if (!inviteeEmployer) {
          throw new Error("Employer not found");
        }

        inviteeEmployer.companies.find((company) => {
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
        });

        return { employer, invitation };
      });
      if (invitation) {
        return {
          success: true,
          message: "Invitation sent successfully",
        };
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error.message);
        return {
          success: false,
          message: error.message || "Something went wrong",
        };
      } else {
        console.log("error", String(error));
        return {
          success: false,
          message: String(error || "Something Went Wrong"),
        };
      }
    }
  });

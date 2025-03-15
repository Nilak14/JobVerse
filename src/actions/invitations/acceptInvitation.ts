"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";
import { handleError } from "@/lib/utils";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
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
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        }),
      ]);

      if (invitation?.company.isDeleted) {
        return {
          success: false,
          message: "The Company does not Exist",
          status: 404,
        };
      }

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

      const memberExistAlready = await prisma.companyMember.findUnique({
        where: {
          employerId_companyId: {
            employerId: inviteeEmployer.id,
            companyId: invitation.companyId,
          },
          isDeleted: true,
        },
      });

      if (memberExistAlready) {
        await prisma.companyMember.update({
          where: {
            employerId_companyId: {
              employerId: inviteeEmployer.id,
              companyId: invitation.companyId,
            },
            isDeleted: true,
          },
          data: {
            isDeleted: false,
            deletedAt: null,
          },
        });
      } else {
        await prisma.company.update({
          where: {
            id: invitation.companyId,
            isDeleted: false,
          },
          data: {
            members: {
              create: {
                employerId: inviteeEmployer.id,
                role: "MEMBER",
              },
            },
          },
        });
      }

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
      const company = await prisma.company.findUnique({
        where: {
          id: invitation.companyId,
        },
        select: {
          members: {
            select: {
              employer: {
                select: { userId: true },
              },
            },
          },
        },
      });
      if (company) {
        const memberIds = company.members.map(
          (member) => member.employer.userId
        );
        await Promise.all(
          memberIds.map(async (memberId) => {
            const notification = await prisma.notifications.create({
              data: {
                title: "New Member",
                body: `(${inviteeEmployer.user.name}) has joined (${invitation.company.name})`,
                category: "NEW_MEMBER_JOINED",
                userId: memberId,
                imageURL: inviteeEmployer.user.image,
              },
              select: getNotificationSelect(),
            });
            triggerNotification(memberId, notification);
          })
        );
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
      revalidatePath(`/employer/company/members`);
      return {
        success: true,
        message: ` You have successfully joined ${invitation.company.name}`,
        status: 200,
      };
    } catch (error) {
      return {
        ...handleError({ error, errorIn: "Accept Invitation Action" }),
        status: 500,
      };
    }
  });

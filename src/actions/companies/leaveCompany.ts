"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";

const action = createSafeActionClient();

// leave company server action. For Admin to remove employer and employer to leave the company

export const leaveCompany = action
  .schema(
    z.object({
      employerId: z.string().optional(),
      isAdminAction: z.boolean().default(false),
    })
  )
  .action(async ({ parsedInput: { employerId, isAdminAction } }) => {
    try {
      const session = await auth();
      if (
        !session ||
        !session.user ||
        !session.activeCompanyId ||
        !session.employerId
      ) {
        throw new Error("Unauthorized");
      }

      // it members is removed by admin
      if (isAdminAction) {
        if (!employerId) {
          return {
            success: false,
            message: "Employer is required to remove from company",
          };
        }

        // check if that member exist in company or not
        const member = await prisma.companyMember.findFirst({
          where: {
            employerId,
            companyId: session.activeCompanyId,
            isDeleted: false,
          },
          include: {
            employer: true,
          },
        });
        // if member do not exist
        if (!member) {
          return {
            success: false,
            message: "You are not a member of this company",
          };
        }
        // check if user sending this req is admin or not
        const adminMember = await prisma.companyMember.findFirst({
          where: {
            employerId: session.employerId,
            companyId: session.activeCompanyId,
            role: "ADMIN",
            isDeleted: false,
          },
        });

        if (!adminMember) {
          return {
            success: false,
            message: "Unauthorized: Only admin can remove company members",
          };
        }

        if (employerId === adminMember.employerId) {
          return {
            success: false,
            message: "Admin cannot leave the company",
          };
        }

        await prisma.companyMember.update({
          where: {
            employerId_companyId: {
              companyId: session.activeCompanyId,
              employerId,
            },
            isDeleted: false,
          },
          data: {
            isDeleted: true,
            deletedAt: new Date(),
            employer: {
              update: {
                activeCompanyId: null,
              },
            },
          },
        });
        after(async () => {
          await prisma.invitations.deleteMany({
            where: {
              companyId: session.activeCompanyId!,
              inviteeId: employerId,
            },
          });
        });
        revalidatePath(`/employer/company/members`);
        revalidatePath(`/employer/company/setting`);
        return {
          success: true,
          message: "Employer Removed Successfully",
        };
        // if member left company them selves
      } else {
        const member = await prisma.companyMember.findFirst({
          where: {
            employerId: session.employerId,
            companyId: session.activeCompanyId,
            isDeleted: false,
          },
          include: {
            employer: true,
          },
        });

        // member do not exist in that company
        if (!member) {
          return {
            success: false,
            message: "You are not a member of this company",
          };
        }
        // member is admin and admin can't leave the company
        if (member.role === "ADMIN") {
          return {
            success: false,
            message:
              "You are an admin of this company. You cannot leave this company",
          };
        }

        // remove the employer from the company
        await prisma.companyMember.update({
          where: {
            employerId_companyId: {
              employerId: session.employerId,
              companyId: session.activeCompanyId,
            },
            isDeleted: false,
          },
          data: {
            isDeleted: true,
            deletedAt: new Date(),
            employer: {
              update: {
                activeCompanyId: null,
              },
            },
          },
        });

        after(async () => {
          await prisma.invitations.deleteMany({
            where: {
              companyId: session.activeCompanyId!,
              inviteeId: session.employerId!,
            },
          });
        });
        revalidatePath(`/employer/company/members`);
        revalidatePath(`/employer/company/setting`);
        return {
          success: true,
          message: "Successfully left the company",
        };
      }
    } catch (error) {
      handleError({ error, errorIn: "Leave Company Action" });
    }
  });

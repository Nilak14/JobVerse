"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";

const action = createSafeActionClient();

export const deleteCompany = action
  .schema(z.object({ companyId: z.string(), employerId: z.string() }))
  .action(async ({ parsedInput: { companyId, employerId } }) => {
    try {
      const session = await auth();
      if (!session || !session.user) {
        throw new Error("Unauthorized");
      }

      // Verify if user is admin
      const member = await prisma.companyMember.findFirst({
        where: {
          companyId,
          employerId,
          isDeleted: false,
          role: "ADMIN",
        },
      });

      if (!member) {
        return {
          success: false,
          error: "Unauthorized: Only company admin can delete the company",
        };
      }

      // Get all active company members
      const companyMembers = await prisma.companyMember.findMany({
        where: {
          companyId,
          isDeleted: false,
        },
        include: {
          employer: true,
          company: true,
        },
      });

      await prisma.$transaction(async (prisma) => {
        // Update all members at once
        await prisma.companyMember.updateMany({
          where: {
            companyId,
            isDeleted: false,
          },

          data: {
            isDeleted: true,
            deletedAt: new Date(),
          },
        });

        // Update activeCompanyId for affected employers
        for (const member of companyMembers) {
          if (member.employer.activeCompanyId === companyId) {
            await prisma.employer.update({
              where: {
                id: member.employerId,
              },
              data: {
                activeCompanyId: null,
              },
            });
          }
        }

        // Soft delete the company
        await prisma.company.update({
          where: {
            id: companyId,
          },
          data: {
            isDeleted: true,
            deletedAt: new Date(),
          },
        });
      });

      // delete all the invitaion of the company
      after(async () => {
        await prisma.invitations.deleteMany({
          where: {
            companyId: companyId,
          },
        });
      });

      revalidatePath(`/employer/company/members`);
      revalidatePath(`/employer/company/setting`);

      return {
        success: true,
        message: "Company successfully deleted",
      };
    } catch (error) {
      return handleError({ error, errorIn: "Delete Company Action" });
    }
  });

//todo: delete company jobs and invitations also

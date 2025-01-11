"use server";

import prisma from "@/lib/prisma";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const action = createSafeActionClient();

export const deleteCompany = action
  .schema(z.object({ companyId: z.string(), employerId: z.string() }))
  .action(async ({ parsedInput: { companyId, employerId } }) => {
    try {
      // verify if user is admin or not

      const member = await prisma.companyMember.findFirst({
        where: {
          companyId,
          employerId,
          role: "ADMIN",
        },
      });

      if (!member) {
        return {
          success: false,
          error: "Unauthorized: Only company admin can delete the company",
        };
      }

      const companyMembers = await prisma.companyMember.findMany({
        where: {
          companyId,
        },
        include: {
          employer: true,
        },
      });

      await prisma.$transaction(async (prisma) => {
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
        await prisma.company.delete({
          where: {
            id: companyId,
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
      return {
        success: false,
        message: "Failed to delete the company",
      };
    }
  });

//todo: delete company jobs and invitations also

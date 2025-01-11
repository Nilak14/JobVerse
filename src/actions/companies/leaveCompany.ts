"use server";

import prisma from "@/lib/prisma";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const action = createSafeActionClient();

export const leaveCompany = action
  .schema(z.object({ employerId: z.string(), companyId: z.string() }))
  .action(async ({ parsedInput: { companyId, employerId } }) => {
    try {
      const member = await prisma.companyMember.findFirst({
        where: {
          employerId,
          companyId,
        },
        include: {
          employer: true,
        },
      });

      if (!member) {
        return {
          success: false,
          message: "You are not a member of this company",
        };
      }

      if (member.role === "ADMIN") {
        return {
          success: false,
          message:
            "You are an admin of this company. You cannot leave this company",
        };
      }
      // delete the member form the company
      await prisma.companyMember.delete({
        where: {
          employerId_companyId: {
            employerId,
            companyId,
          },
        },
      });
      // edit their active company if they are leaving the active company
      await prisma.employer.update({
        where: {
          id: employerId,
        },
        data: {
          activeCompanyId: {
            set:
              member.companyId === member.employer.activeCompanyId
                ? null
                : undefined,
          },
        },
      });

      await prisma.invitations.deleteMany({
        where: {
          companyId: companyId,
          inviteeId: employerId,
        },
      });

      revalidatePath(`/employer/company/members`);
      revalidatePath(`/employer/company/setting`);
      return {
        success: true,
        message: "Successfully left the company",
      };
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  });

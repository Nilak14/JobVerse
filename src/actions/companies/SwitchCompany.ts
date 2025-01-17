"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

const action = createSafeActionClient();

export const switchCompany = action
  .schema(
    z.object({
      companyId: z.string().min(1, { message: "Company Id is Required" }),
    })
  )
  .action(async ({ parsedInput: { companyId } }) => {
    try {
      const session = await auth();
      if (!session || !session.user) {
        throw new Error("Unauthorized");
      }
      // check if user belongs to that company or not
      const employerCompany = await prisma.companyMember.findFirst({
        where: {
          company: {
            id: companyId,
          },
          employer: {
            userId: session.user.id,
          },
        },
      });
      if (!employerCompany) {
        return {
          error: "Company Not Found or You are not part of this company",
        };
      }

      await prisma.employer.update({
        where: { id: employerCompany.employerId },
        data: { activeCompanyId: companyId },
      });

      return { success: "Company switched successfully" };
    } catch (error) {
      return { error: "Something went wrong, while switching the company" };
    }
  });

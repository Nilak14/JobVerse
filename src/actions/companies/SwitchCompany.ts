"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
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
          isDeleted: false,
          company: {
            id: companyId,
            isDeleted: false,
          },
          employer: {
            userId: session.user.id,
          },
        },
      });
      if (!employerCompany) {
        return {
          success: false,
          message: "Company Not Found or You are not part of this company",
        };
      }

      await prisma.employer.update({
        where: { id: employerCompany.employerId },
        data: { activeCompanyId: companyId },
      });
      revalidatePath("/employer/setting");

      return { success: true, message: "Company switched successfully " };
    } catch (error) {
      return handleError({ error, errorIn: "Switch Company Action" });
    }
  });

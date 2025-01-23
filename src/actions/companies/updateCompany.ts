"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { CompanySchema } from "@/schema/CompanySchema";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const updateCompany = action
  .schema(CompanySchema)
  .action(async ({ parsedInput: { description, name, websiteURl } }) => {
    try {
      const session = await auth();
      if (
        !session ||
        !session.user ||
        !session.activeCompanyId ||
        !session.employerId
      ) {
        throw new Error("Unauthorized Request");
      }

      // check if employer exist or not

      const existingEmployer = await prisma.employer.findUnique({
        where: {
          id: session.employerId,
        },
      });

      if (!existingEmployer) {
        return { success: false, message: "Employer Not Found" };
      }

      // check company exist or not
      const existingCompany = await prisma.company.findFirst({
        where: {
          id: session.activeCompanyId,
          isDeleted: false,
        },
      });

      if (!existingCompany) {
        return { success: false, message: "Company Not found" };
      }

      // check if employer is admin or not of that company
      if (existingCompany.adminEmployerId !== session.employerId) {
        return {
          success: false,
          message: "Only Admin can update the company details",
        };
      }

      // update the company

      const updatedCompany = await prisma.company.update({
        where: {
          id: session.activeCompanyId,
          isDeleted: false,
        },
        data: {
          name,
          description,
          website: websiteURl,
        },
      });
      revalidatePath("/employer/company/setting");
      return {
        success: true,
        message: "Company Details Updated Successfully",
        data: { company: updatedCompany },
      };
    } catch (error) {
      return handleError({ error, errorIn: "Update Company Action" });
    }
  });

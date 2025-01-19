"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { CompanySchema } from "@/schema/CompanySchema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const createCompany = action
  .schema(CompanySchema)
  .action(async ({ parsedInput: { description, name, websiteURl } }) => {
    try {
      const session = await auth();
      const user = session?.user;
      if (!user) {
        throw new Error("Unauthorized");
      }

      // Check if the user is an employer
      const employer = await prisma.employer.findUnique({
        where: { userId: user.id },
        // select: { activeCompanyId: true, id: true },
      });

      if (!employer) {
        throw new Error("Only employers can create companies");
      }

      // Create the company with adminEmployerId
      const newCompany = await prisma.company.create({
        data: {
          name,
          description,
          website: websiteURl,
          adminEmployerId: employer.id,
          members: {
            create: {
              employerId: employer.id,
              role: "ADMIN",
            },
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
          website: true,
          logoUrl: true,
        },
      });
      if (employer.activeCompanyId === null) {
        await prisma.employer.update({
          where: { id: employer.id },
          data: { activeCompanyId: newCompany.id },
        });
      }

      return {
        success: true,
        message: "Company created successfully",
        data: { company: newCompany },
      };
    } catch (error) {
      return handleError({ error, errorIn: "Create Company Action" });
    }
  });

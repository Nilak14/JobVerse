"use server";

import { signOut } from "@/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { OmitEmployerCompanies } from "@/lib/prisma-types/Employers";
import { handleError } from "@/lib/utils";

export const setActiveCompany = async () => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.type !== "EMPLOYER") {
      await signOut();
      return { success: false, message: "Unauthorized" };
    }

    const userCompany = await prisma.company.findMany({
      where: {
        isDeleted: false,
        members: {
          some: {
            isDeleted: false,
            employer: {
              id: session.employerId!,
            },
          },
        },
      },
      omit: OmitEmployerCompanies(),
    });

    if (userCompany.length === 0) {
      return { success: false, message: "You are not part of any company" };
    }

    await prisma.employer.updateMany({
      where: {
        id: session.employerId!,
        userId: session.user.id,
      },
      data: {
        activeCompanyId: userCompany[0].id,
      },
    });
    return { success: true, message: "Active Company Set" };
  } catch (error) {
    return handleError({ error, errorIn: "Set Active Company Action" });
  }
};

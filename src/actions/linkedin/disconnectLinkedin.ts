"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const linkedinDisconnect = async () => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      throw new Error("Not authenticated");
    }
    const companyId = session.activeCompanyId;
    await prisma.linkedInToken.deleteMany({
      where: {
        companyId: companyId,
      },
    });
    revalidatePath("/employer/company/setting");
    return {
      success: true,
      message: "LinkedIn account disconnected successfully",
    };
  } catch (error) {
    return handleError({ error, errorIn: "handleLinkedinDisconnect" });
  }
};

"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const toggleTwoFactorAuthentication = async (newStatus: boolean) => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("User not found");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        isTwoFactorEnabled: newStatus,
      },
      select: {
        isTwoFactorEnabled: true,
      },
    });

    revalidatePath("/job-seeker/settings/account-settings?tab=privacy");
    return {
      success: true,
      message: `Two factor authentication ${
        updatedUser.isTwoFactorEnabled ? "enabled" : "disabled"
      } successfully`,
    };
  } catch (error) {
    return handleError({ error, errorIn: "toggleProfileVisibility" });
  }
};

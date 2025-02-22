"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const toggleProfileVisibility = async (newStatus: boolean) => {
  try {
    const session = await auth();
    if (
      !session ||
      !session.user ||
      !session.jobSeekerId ||
      session.user.type !== "JOB_SEEKER"
    ) {
      throw new Error("User not found");
    }
    await prisma.jobSeekerProfile.update({
      where: {
        userId: session.jobSeekerId,
      },
      data: {
        profileVisibility: newStatus,
      },
    });
    revalidatePath("/job-seeker/settings/account-settings?tab=privacy");
    return {
      success: true,
      message: "Profile visibility updated successfully",
    };
  } catch (error) {
    return handleError({ error, errorIn: "toggleProfileVisibility" });
  }
};

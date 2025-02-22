"use sever";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const toggleJobSeekerProfileVisibility = async (visibility: boolean) => {
  try {
    const session = await auth();
    if (
      !session ||
      !session.user ||
      !session.jobSeekerId ||
      session.user.type !== "JOB_SEEKER"
    ) {
      throw new Error("Not Authorized");
    }

    await prisma.jOB_SEEKER.update({
      where: { id: session.jobSeekerId },
      data: {
        profileVisibility: !visibility,
      },
    });
    return {
      success: true,
      message: "Profile visibility updated successfully",
    };
  } catch (error) {
    return handleError({
      error: error,
      errorIn: "toggleJobSeekerProfileVisibility",
    });
  }
};

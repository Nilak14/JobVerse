"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import {
  PersonalInformationSchema,
  PersonalInformationSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import { revalidatePath } from "next/cache";

export const profileSettings = async (value: PersonalInformationSchemaType) => {
  try {
    const { success, data, error } = PersonalInformationSchema.safeParse(value);
    if (!success) {
      return { success: false, message: error.message };
    }
    const session = await auth();
    if (
      !session ||
      !session.user ||
      !session.jobSeekerId ||
      session.user.type !== "JOB_SEEKER"
    ) {
      throw new Error("User not found");
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: { name: data.fullName },
      }),

      prisma.jobSeekerProfile.update({
        where: { userId: session.jobSeekerId },
        data: {
          location: data.address,
          bio: data.bio,
          designation: data.designation,
          openToWork: data.openToWork,
        },
      }),
    ]);

    revalidatePath("/job-seeker/settings/account-settings?tab=profile");
    return {
      success: true,
      message: `Profile updated successfully`,
    };
  } catch (error) {
    return handleError({ error, errorIn: "profileSettings" });
  }
};

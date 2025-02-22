"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import {
  PreferencesSettingsSchema,
  PreferencesSettingsSchemaSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import { revalidatePath } from "next/cache";

export const preferencesSetting = async (
  value: PreferencesSettingsSchemaSchemaType
) => {
  try {
    const { success, error, data } = PreferencesSettingsSchema.safeParse(value);
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

    await prisma.jobSeekerProfile.update({
      where: { userId: session.jobSeekerId },
      data: {
        receiveJobApplicationUpdated: data.applicationUpdates,
        receiveJobRecommendationEmail: data.jobRecommendationEmails,
        receiveMarketingEmails: data.marketingEmails,
      },
    });
    revalidatePath("/job-seeker/settings/account-settings?tab=preferences");
    return {
      success: true,
      message: `Preferences updated successfully`,
    };
  } catch (error) {
    return handleError({ error, errorIn: "preferencesSetting" });
  }
};

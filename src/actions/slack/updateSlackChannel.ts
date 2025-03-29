"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";

interface UpdateSlackChannelParams {
  channelId: string;
}

export const updateSlackChannel = async ({
  channelId,
}: UpdateSlackChannelParams) => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      throw new Error("Unauthorized");
    }

    await prisma.company.update({
      where: {
        id: session.activeCompanyId,
      },
      data: {
        slackChannelId: channelId,
      },
    });
    return { success: true, message: "Slack channel updated successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "updateSlackChannel" });
  }
};

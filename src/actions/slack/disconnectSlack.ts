"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const disconnectSlack = async () => {
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
        slackAccessToken: null,
        slackChannelId: null,
      },
    });
    return { success: true, message: "Slack disconnected successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "disconnectSlack" });
  }
};

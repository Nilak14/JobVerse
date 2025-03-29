"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";

interface SendTestMessageParams {
  channelId: string;
  message: string;
}

export const sendTestMessage = async ({
  channelId,
  message,
}: SendTestMessageParams) => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      throw new Error("Unauthorized");
    }
    const company = await prisma.company.findUnique({
      where: {
        id: session.activeCompanyId,
      },
      select: {
        slackAccessToken: true,
      },
    });
    if (!company) {
      throw new Error("Company not found");
    }

    const slackResponse = await fetch(
      "https://slack.com/api/chat.postMessage",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${company.slackAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channelId,
          text: message,
        }),
      }
    );
    const slackData = await slackResponse.json();
    if (!slackData.ok) {
      console.log("Slack error:", slackData);
      throw new Error("Failed to send message to Slack");
    }
    return { success: true, message: "Test message sent successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "sendTestMessage" });
  }
};

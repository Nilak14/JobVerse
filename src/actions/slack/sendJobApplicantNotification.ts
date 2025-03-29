"use server";

import { JobApplicationSlackNotificationBlock } from "@/lib/data/slackBlock";
import prisma from "@/lib/prisma";

interface SendJobApplicantNotificationParams {
  jobTitle: string;
  applicantName: string;
  jobId: string;
  companyId: string;
}
export const sendJobApplicantNotification = async ({
  applicantName,
  jobId,
  jobTitle,
  companyId,
}: SendJobApplicantNotificationParams) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        slackAccessToken: true,
        slackChannelId: true,
      },
    });
    if (!company) {
      return;
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
          channel: company.slackChannelId,

          blocks: JSON.stringify(
            JobApplicationSlackNotificationBlock({
              applicantName,
              jobId,
              jobTitle,
            })
          ),
        }),
      }
    );
    const slackData = await slackResponse.json();
    if (!slackData.ok) {
      console.log("Slack error:", slackData);
      return;
    }
    return { success: true, message: "Notification sent successfully" };
  } catch (error) {
    console.error("Error fetching company:", error);
  }
};

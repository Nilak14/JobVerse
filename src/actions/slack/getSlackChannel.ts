"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
export interface SlackChannel {
  id: string;
  name: string;
}
export const getSlackChannel = async (): Promise<SlackChannel[]> => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      return [];
    }
    const company = await prisma.company.findUnique({
      where: {
        id: session.activeCompanyId,
      },
      select: {
        slackAccessToken: true,
      },
    });
    if (!company || !company.slackAccessToken) {
      return [];
    }
    const response = await fetch("https://slack.com/api/conversations.list", {
      headers: {
        Authorization: "Bearer " + company?.slackAccessToken,
      },
    });
    const data = await response.json();
    if (!data.ok) {
      return [];
    }
    return data.channels;
  } catch (error) {
    return [];
  }
};

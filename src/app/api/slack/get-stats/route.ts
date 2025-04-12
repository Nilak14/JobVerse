"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const companyId = session.activeCompanyId;
    const slackToken = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        slackAccessToken: true,
        slackChannelId: true,
      },
    });
    let data;
    if (
      slackToken &&
      slackToken.slackAccessToken &&
      slackToken.slackChannelId
    ) {
      data = true;
    } else {
      data = false;
    }
    return Response.json(
      { success: true, message: "Slack status fetched", data },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error while fetching slack status" },
      { status: 500 }
    );
  }
};

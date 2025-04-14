import { discordCronJobBot } from "@/actions/discord_bot/bot";
import prisma from "@/lib/prisma";
import { after } from "next/server";

export const GET = async () => {
  try {
    const needToExpireJobs = await prisma.job.findMany({
      where: {
        status: {
          not: "EXPIRED",
        },
        deadline: {
          lte: new Date(),
        },
      },
    });
    if (needToExpireJobs.length > 0) {
      const job = await prisma.job.updateMany({
        where: {
          id: {
            in: needToExpireJobs.map((job) => job.id),
          },
        },
        data: {
          status: "EXPIRED",
        },
      });
      await discordCronJobBot({
        type: "JOB_EXPIRED",
        success: true,
        message: `${job.count} Jobs expired`,
      });
    } else {
      await discordCronJobBot({
        type: "JOB_EXPIRED",
        success: true,
        message: "No Expire Jobs Found",
      });
    }
  } catch (error) {
    await discordCronJobBot({
      type: "JOB_EXPIRED",
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    console.error("Error expiring jobs:", error);
  }
};

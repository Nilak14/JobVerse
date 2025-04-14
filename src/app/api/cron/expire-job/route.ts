import prisma from "@/lib/prisma";

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
      await prisma.job.updateMany({
        where: {
          id: {
            in: needToExpireJobs.map((job) => job.id),
          },
        },
        data: {
          status: "EXPIRED",
        },
      });
    }
    //todo: send notification to admin in discord
  } catch (error) {
    //todo: send error to admin in discord
    console.error("Error expiring jobs:", error);
  }
};

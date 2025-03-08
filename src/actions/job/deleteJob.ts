"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const deleteJob = async (jobId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.activeCompanyId) {
      throw new Error("Unauthorized");
    }
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
        companyId: session.activeCompanyId,
      },
      select: {
        status: true,
      },
    });
    if (!job) {
      throw new Error("Job not found");
    }
    if (job.status !== "DRAFT") {
      throw new Error("This job can be deleted");
    }
    await prisma.job.update({
      where: {
        id: jobId,
        companyId: session.activeCompanyId,
      },
      data: {
        status: "DELETED",
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
    revalidatePath("/employer/job");
    return { success: true, message: "Job deleted successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "Delete Job" });
  }
};

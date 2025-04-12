"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

interface UpdateJobSlackStatusParams {
  jobId: string;
  newStatus: boolean;
}
export const updateJobSlackStatus = async ({
  jobId,
  newStatus,
}: UpdateJobSlackStatusParams) => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      throw new Error("Unauthorized");
    }
    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        sendEmailNotification: newStatus,
      },
    });
    revalidatePath("/employer/job");
    return { success: true, message: "Job Slack status updated successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "updateJobSlackStatus" });
  }
};

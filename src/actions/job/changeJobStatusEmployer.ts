"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { JobStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

//logic

/**
 *
 * @param jobId
 * @param status
 *
 * ---------------No--------------------
 * if job status is Accepted or Rejected, then status cant be pending
 * if job status is draft, then status cant be accepted or rejected
 *  -------------------Yes----------------
 * if job status is pending, then status can be accepted or rejected
 * if job status is draft, then status can be pending
 *
 */

export const changeJobStatus = async (jobId: string, newStatus: JobStatus) => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.activeCompanyId ||
    !session.employerId
  ) {
    throw new Error("Unauthorized");
  }
  if (jobId === undefined || newStatus === undefined) {
    return { success: false, message: "Invalid data" };
  }

  // does job exist
  const job = await prisma.job.findUnique({
    where: { id: jobId, companyId: session.activeCompanyId },
  });

  if (!job) {
    return { success: false, message: "Job not found" };
  }
  // if job status is accepted or rejected, check if user is admin or not

  if (
    newStatus === JobStatus.ACTIVE ||
    newStatus === JobStatus.REJECTED ||
    newStatus === JobStatus.NEED_REVIEW
  ) {
    return { success: false, message: "Unauthorized" };
  }

  // update job status

  // cant change status to pending if job status is active or rejected
  if (job.status === JobStatus.ACTIVE || job.status === JobStatus.REJECTED) {
    if (newStatus === JobStatus.PENDING) {
      return { success: false, message: "Invalid status change" };
    }
  }

  if (newStatus === JobStatus.DRAFT) {
    if (job.status === JobStatus.ACTIVE || job.status === JobStatus.REJECTED) {
      return { success: false, message: "Invalid status change" };
    }
  }

  await prisma.job.update({
    where: { id: jobId },
    data: { status: newStatus },
  });
  revalidatePath("/employer/job");
  return { success: true, message: "Job status updated successfully" };
};

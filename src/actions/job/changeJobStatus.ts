"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { JobStatus } from "@prisma/client";

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
  console.log("jobId", jobId);
  console.log("newStatus", newStatus);

  // does job exist
  const job = await prisma.job.findUnique({
    where: { id: jobId, companyId: session.activeCompanyId },
  });

  if (!job) {
    return { success: false, message: "Job not found" };
  }
  // if job status is accepted or rejected, check if user is admin or not

  if (newStatus === JobStatus.ACCEPTED || newStatus === JobStatus.REJECTED) {
    if (session.user.type === "ADMIN") {
      return { success: false, message: "Unauthorized" };
    }
  }

  // update job status

  // cant change status to pending if job status is accepted or rejected
  if (job.status === JobStatus.ACCEPTED || job.status === JobStatus.REJECTED) {
    if (newStatus === JobStatus.PENDING) {
      return { success: false, message: "Invalid status change" };
    }
  }

  // cant change status to accepted or rejected if job status is draft
  if (job.status === JobStatus.INDRAFT) {
    if (newStatus === JobStatus.ACCEPTED || newStatus === JobStatus.REJECTED) {
      return { success: false, message: "Invalid status change" };
    }
  }

  if (newStatus === JobStatus.INDRAFT) {
    if (
      job.status === JobStatus.ACCEPTED ||
      job.status === JobStatus.REJECTED
    ) {
      return { success: false, message: "Invalid status change" };
    }
  }

  await prisma.job.update({
    where: { id: jobId },
    data: { status: newStatus },
  });
  return { success: true, message: "Job status updated successfully" };
};

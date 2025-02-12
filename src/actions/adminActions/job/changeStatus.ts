"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { JobReviewStatus, JobStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeStatus = async (
  jobId: string,
  newStatus: JobReviewStatus,
  message?: string
) => {
  try {
    if (!jobId || !newStatus) {
      return { success: false, message: "Invalid data" };
    }
    const session = await auth();
    if (
      !session ||
      !session.user ||
      session.user.type !== "ADMIN" ||
      !session.adminId
    ) {
      return { success: false, message: "Unauthorized" };
    }
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      return { success: false, message: "Job not found" };
    }
    // cant update status if job is active
    if (job.status === JobStatus.ACTIVE) {
      return { success: false, message: "Unauthorized" };
    }

    // cant update status if job is rejected
    if (job.status === JobStatus.REJECTED) {
      return { success: false, message: "Unauthorized" };
    }

    // cant update status if job is draft
    if (job.status === JobStatus.DRAFT) {
      return { success: false, message: "Unauthorized" };
    }

    const getUpdateJobStatus = (reviewStatus: JobReviewStatus): JobStatus => {
      switch (reviewStatus) {
        case "APPROVED":
          return "ACTIVE";
        case "REJECTED":
          return "REJECTED";
        case "NEED_REVIEW":
          return "NEED_REVIEW";
        default:
          throw new Error("Invalid status");
      }
    };

    const res = await prisma.$transaction(async (tx) => {
      await tx.jobReview.upsert({
        where: {
          jobId: jobId,
        },
        create: {
          jobId: jobId,
          reviewedStatus: newStatus,
          reviewedBy: session.adminId,
          reviewedAt: new Date(),
          reviewedComment: message,
        },
        update: {
          reviewedStatus: newStatus,
          reviewedBy: session.adminId,
          reviewedAt: new Date(),
          reviewedComment: message,
        },
      });

      await tx.job.update({
        where: {
          id: jobId,
        },
        data: {
          status: getUpdateJobStatus(newStatus),
        },
      });
    });

    revalidatePath("/admin/all-jobs");
    revalidatePath("/employer/job");

    return {
      success: true,
      message: "Status updated successfully",
    };
  } catch (error) {
    return handleError({
      error,
      errorIn: "changeStatus",
      defaultMessage: "Failed to change status",
    });
  }
};

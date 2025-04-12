"use server";

import { postToLinkedIn } from "@/actions/linkedin/createPost";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";
import { handleError } from "@/lib/utils";
import { JobReviewStatus, JobStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

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

      return await tx.job.update({
        where: {
          id: jobId,
        },
        data: {
          status: getUpdateJobStatus(newStatus),
        },
        select: {
          postInLinkedIn: true,
          linkedInCaption: true,
          company: {
            select: {
              name: true,
              logoUrl: true,
              members: {
                select: {
                  employer: {
                    select: {
                      userId: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    });

    let notificationTitle: string;
    let notificationMessage: string;
    switch (newStatus) {
      case "APPROVED":
        notificationTitle = "Job Approved";
        notificationMessage = `Job (${job.title}) posted by (${res.company.name}) has been Approved and is now live and can be viewed by job seekers`;
        break;
      case "REJECTED":
        notificationTitle = "Job Rejected";
        notificationMessage = `Job (${job.title}) posted by (${res.company.name}) has been Rejected`;
        break;
      case "NEED_REVIEW":
        notificationTitle = "Job Needs Review";
        notificationMessage = `Job (${job.title}) posted by (${res.company.name}) needs review. To see the review message please visit the job page and check the review section`;
        break;
    }

    // send notification to employer
    if (res) {
      const memberIds = res.company.members.map(
        (member) => member.employer.userId
      );
      await Promise.all(
        memberIds.map(async (memberId) => {
          const notification = await prisma.notifications.create({
            data: {
              title: notificationTitle,
              body: notificationMessage,
              category: "JOB_STATUS",
              userId: memberId,
              imageURL: res.company.logoUrl,
            },
            select: getNotificationSelect(),
          });
          triggerNotification(memberId, notification);
        })
      );
    }

    after(() => {
      if (newStatus === "APPROVED") {
        if (res.postInLinkedIn && res.linkedInCaption) {
          postToLinkedIn({
            caption: res.linkedInCaption,
            companyId: job.companyId,
          });
        }
      }
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

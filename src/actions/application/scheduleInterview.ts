"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";
import { handleError } from "@/lib/utils";
import {
  ScheduleInterviewSchema,
  ScheduleInterviewSchemaType,
} from "@/schema/ScheduleInterviewSchema";
import { InterviewType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const scheduleInterview = async (
  values: ScheduleInterviewSchemaType
) => {
  try {
    const { applicationId, interviewDate, interviewTime, interviewType, note } =
      ScheduleInterviewSchema.parse(values);
    const session = await auth();
    if (!session || !session.activeCompanyId || !session.employerId) {
      throw new Error("Unauthorized");
    }
    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
        job: {
          companyId: session.activeCompanyId,
        },
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: {
              select: {
                name: true,
                logoUrl: true,
              },
            },
          },
        },
        jobSeeker: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!application) {
      throw new Error("Application not found");
    }
    if (application.status !== "PENDING") {
      throw new Error("Invalid Status Change");
    }

    const notification = await prisma.$transaction(async (prisma) => {
      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "INTERVIEW",
          Interview: {
            create: {
              interviewDate: new Date(interviewDate),
              interviewTime: interviewTime,
              interviewType: interviewType as InterviewType,
              note: note,
            },
          },
        },
      });
      await prisma.applicationReview.create({
        data: {
          applicationId: applicationId,
          reviewedStatus: "INTERVIEW",
          reviewedBy: session.employerId!,
          reviewedComment: "",
          reviewedAt: new Date(),
        },
      });
      return await prisma.notifications.create({
        data: {
          userId: application.jobSeeker.userId,
          title: "Interview Scheduled",
          body: `Your Application for (${application.job.title}) at (${application.job.company.name}) has been scheduled for interview on (${new Date(interviewDate).toDateString()}) at (${interviewTime})`,

          category: "APPLICATION_STATUS",
          imageURL: application.job.company.logoUrl,
        },
        select: getNotificationSelect(),
      });
    });
    triggerNotification(application.jobSeeker.userId, notification);
    revalidatePath("/employer/applicants");
    revalidatePath("/job-seeker/applied-jobs");
    return {
      success: true,
      message: "Interview Scheduled Successfully",
    };
  } catch (error) {
    return handleError({ error, errorIn: "scheduleInterview" });
  }
};

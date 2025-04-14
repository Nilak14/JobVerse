"use server";

import { auth } from "@/lib/auth";
import { sendApplicationUpdateEmail } from "@/lib/emails";
import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";
import { handleError } from "@/lib/utils";
import {
  ScheduleInterviewSchema,
  ScheduleInterviewSchemaType,
} from "@/schema/ScheduleInterviewSchema";
import { ApplicationStatusTemplateProps } from "@/template/emails/application-update";
import { InterviewType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

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
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            JobSeekerProfile: {
              select: {
                receiveJobApplicationUpdated: true,
              },
            },
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
    after(async () => {
      if (
        !application.jobSeeker.JobSeekerProfile?.receiveJobApplicationUpdated
      ) {
        return;
      }
      const data: ApplicationStatusTemplateProps = {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
        candidateName: application.jobSeeker.user.name!,
        companyName: application.job.company.name,
        jobTitle: application.job.title!,
        email: application.jobSeeker.user.email!,
        status: "interview",
        interviewDetails: {
          date: new Date(interviewDate).toDateString(),
          time: interviewTime,
          type: interviewType,
          note: note,
        },
      };

      await sendApplicationUpdateEmail(data);
    });
    return {
      success: true,
      message: "Interview Scheduled Successfully",
    };
  } catch (error) {
    return handleError({ error, errorIn: "scheduleInterview" });
  }
};

"use server";

import { auth } from "@/lib/auth";
import { sendApplicationUpdateEmail } from "@/lib/emails";
import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";
import { handleError } from "@/lib/utils";
import { ApplicationStatusTemplateProps } from "@/template/emails/application-update";
import { ApplicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
) => {
  try {
    if (!applicationId || !status) {
      throw new Error("Unable To Find application");
    }
    const session = await auth();
    if (
      !session ||
      !session.user ||
      !session.activeCompanyId ||
      !session.employerId
    ) {
      throw new Error("Unauthenticated");
    }
    const application = await prisma.application.findFirst({
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
      throw new Error("Unable To Find application");
    }
    if (application.status === "APPROVED" && status === "REJECTED") {
      throw new Error(
        "Unable To Reject application, as Application is already Approved"
      );
    }
    if (application.status === "REJECTED" && status === "APPROVED") {
      throw new Error(
        "Unable To Approve application, as Application is already Rejected"
      );
    }

    let notificationTitle: string;
    let notificationMessage: string;
    switch (status) {
      case "APPROVED":
        notificationTitle = "Application Approved";
        notificationMessage = `Your Application for (${application.job.title}) at (${application.job.company.name}) has been Approved.`;
        break;
      case "REJECTED":
        notificationTitle = "Application Rejected";
        notificationMessage = `Your Application for (${application.job.title}) at (${application.job.company.name}) has been Rejected`;
        break;
    }

    const res = await prisma.$transaction(async (prisma) => {
      await prisma.application.update({
        where: {
          id: applicationId,
          job: {
            companyId: session.activeCompanyId!,
          },
        },
        data: {
          status: status,
        },
      });
      await prisma.applicationReview.create({
        data: {
          applicationId: applicationId,
          reviewedStatus: status,
          reviewedBy: session.employerId!,
          reviewedComment: "",
          reviewedAt: new Date(),
        },
      });
      return await prisma.notifications.create({
        data: {
          userId: application.jobSeeker.userId,
          title: notificationTitle,
          body: notificationMessage,
          category: "APPLICATION_STATUS",
          imageURL: application.job.company.logoUrl,
        },
        select: getNotificationSelect(),
      });
    });
    if (!res) {
      throw new Error("Unable to update application status");
    }
    triggerNotification(application.jobSeeker.userId, res);
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
        status: "accepted",
        interviewDetails: {
          date: "",
          time: "",
          type: "",
          note: "",
        },
      };
      if (status === "APPROVED") {
        data.status = "accepted";
      } else if (status === "REJECTED") {
        data.status = "rejected";
      }

      await sendApplicationUpdateEmail(data);
    });

    return {
      success: true,
      message: "Applicant Status Updated Successfully",
    };
  } catch (error) {
    return handleError({ error, errorIn: "updateApplicationStatus" });
  }
};

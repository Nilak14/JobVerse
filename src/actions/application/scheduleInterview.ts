"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
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
    });
    if (!application) {
      throw new Error("Application not found");
    }
    if (application.status !== "PENDING") {
      throw new Error("Invalid Status Change");
    }

    await prisma.$transaction(async (prisma) => {
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
    });
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

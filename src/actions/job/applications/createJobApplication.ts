"use server";

import { createCandidateRating } from "@/actions/gemini/createCandidateRating";
import { sendJobApplicantNotification } from "@/actions/slack/sendJobApplicantNotification";
import { signOut } from "@/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";
import { handleError } from "@/lib/utils";
import { ApplyJobSchema, ApplyJobSchemaType } from "@/schema/ApplyJobSchema";
import { after } from "next/server";

export const createJobApplication = async (values: ApplyJobSchemaType) => {
  try {
    const { jobId, jobSeekerId, resumeId } = ApplyJobSchema.parse(values);
    const session = await auth();
    if (!session || !session.user || session.user.type !== "JOB_SEEKER") {
      await signOut();
      throw new Error("Unauthorized");
    }
    if (session.user.isBlocked) {
      await signOut();
      throw new Error("Your account is blocked");
    }

    const [job, application] = await Promise.all([
      prisma.job.findUnique({
        where: {
          id: jobId,
        },
        include: {
          company: {
            select: {
              logoUrl: true,
              subscriptions: {
                select: {
                  stripePriceId: true,
                },
              },

              members: {
                select: {
                  employer: {
                    select: {
                      userId: true,
                    },
                  },
                },
              },
              slackAccessToken: true,
              slackChannelId: true,
            },
          },
        },
      }),
      await prisma.application.findUnique({
        where: {
          jobId_jobSeekerId: {
            jobId: jobId,
            jobSeekerId: jobSeekerId,
          },
        },
      }),
    ]);

    if (!job) {
      throw new Error("Job not found");
    }
    if (application) {
      throw new Error("You have already applied for this job");
    }

    if (job.resumeRequired && !resumeId) {
      throw new Error("Resume is required for this job");
    }

    if (job.deadline && new Date(job.deadline) < new Date()) {
      throw new Error("Job application deadline has passed");
    }
    const newApplication = await prisma.application.create({
      data: {
        jobId,
        jobSeekerId,
        resumeId,
      },
      select: {
        id: true,
      },
    });
    after(async () => {
      if (!job.sendEmailNotification) {
        return;
      }
      if (!job.company.slackAccessToken || !job.company.slackChannelId) {
        return;
      }
      await sendJobApplicantNotification({
        applicantName: session.user.name || "Anonymous",
        jobId: jobId,
        jobTitle: job.title || "",
        companyId: job.companyId,
      });
    });
    after(async () => {
      if (!newApplication) {
        return;
      }
      await createCandidateRating({
        resumeId: resumeId || null,
        jobSeekerId: jobSeekerId,
        jobTitle: job.title || null,
        jobDescription: job.description || null,
        applicationId: newApplication.id,
        jobSkills: job.skills.join(" ") || null,
      });
    });
    after(async () => {
      const memberIds = job.company.members.map(
        (member) => member.employer.userId
      );
      await Promise.all(
        memberIds.map(async (memberId) => {
          const notification = await prisma.notifications.create({
            data: {
              title: `New Job Application for ${job.title}`,
              body: `${
                session.user.name || "Anonymous"
              } has applied for the job ${job.title}`,
              category: "NEW_APPLICATION",
              userId: memberId,
              imageURL: job.company.logoUrl,
            },
            select: getNotificationSelect(),
          });
          triggerNotification(memberId, notification);
        })
      );
    });
    return { success: true, message: "Job Applied  successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "Create Job Application" });
  }
};

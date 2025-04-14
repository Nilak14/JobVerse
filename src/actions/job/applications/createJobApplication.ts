"use server";

import { createCandidateRating } from "@/actions/gemini/createCandidateRating";
import { sendJobApplicantNotification } from "@/actions/slack/sendJobApplicantNotification";
import { signOut } from "@/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
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
              subscriptions: {
                select: {
                  stripePriceId: true,
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
      console.log("after runs");

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
      console.log("after runs for rating");

      await createCandidateRating({
        resumeId: resumeId || null,
        jobSeekerId: jobSeekerId,
        jobTitle: job.title || null,
        jobDescription: job.description || null,
        applicationId: newApplication.id,
        jobSkills: job.skills.join(" ") || null,
      });
    });
    return { success: true, message: "Job Applied  successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "Create Job Application" });
  }
};

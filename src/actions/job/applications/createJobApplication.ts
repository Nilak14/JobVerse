"use server";

import { signOut } from "@/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { ApplyJobSchema, ApplyJobSchemaType } from "@/schema/ApplyJobSchema";

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
    await prisma.application.create({
      data: {
        jobId,
        jobSeekerId,
        resumeId,
      },
    });
    return { success: true, message: "Job Applied  successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "Create Job Application" });
  }
};

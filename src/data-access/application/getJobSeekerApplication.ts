import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { JobApplicationSelect } from "@/lib/prisma-types/Application";
import { cache } from "react";

export const getJobSeekerAllApplication = cache(async () => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.jobSeekerId ||
    session.user.type !== "JOB_SEEKER"
  ) {
    return null;
  }
  const applications = await prisma.application.findMany({
    where: {
      jobSeekerId: session.jobSeekerId,
    },
    select: JobApplicationSelect(),
  });
  return applications;
});

export const getJobApplicationForCount = cache(async () => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.jobSeekerId ||
    session.user.type !== "JOB_SEEKER"
  ) {
    return null;
  }
  const applications = await prisma.application.findMany({
    where: {
      jobSeekerId: session.jobSeekerId,
    },
    select: {
      status: true,
    },
  });
  return applications;
});

import "server-only";
import { signOut } from "@/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  getJobSeekerProfileSelect,
  JobSeekerProfile,
} from "@/lib/prisma-types/JobSeekerProfile";
import { cache } from "react";

export const getJobSeekerProfile = cache(async () => {
  const session = await auth();
  if (!session || !session.user || session.user.type !== "JOB_SEEKER") {
    return {} as JobSeekerProfile;
  }
  if (session.user.isBlocked) {
    signOut();
  }
  const jobSeeker = await prisma.user.findUnique({
    where: {
      id: session.user.id,
      userType: "JOB_SEEKER",
    },
    select: getJobSeekerProfileSelect(),
  });
  return jobSeeker;
});

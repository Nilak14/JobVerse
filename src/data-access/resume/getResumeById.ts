import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResumeDataInclude } from "@/lib/prisma-types/Resume";

export const getResumeById = async (resumeId: string) => {
  const session = await auth();
  if (!session || !session.jobSeekerId || !session.user) {
    return null;
  }
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
      userId: session.jobSeekerId,
    },
    include: ResumeDataInclude,
  });
  return resume;
};

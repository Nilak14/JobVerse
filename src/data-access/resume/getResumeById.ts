import prisma from "@/lib/prisma";
import { ResumeDataInclude } from "@/lib/prisma-types/Resume";
import { cache } from "react";

export const getResumeById = cache(async (resumeId: string) => {
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
    },
    include: ResumeDataInclude,
  });
  return resume;
});

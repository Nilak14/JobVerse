"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { del } from "@vercel/blob";
import { revalidateTag } from "next/cache";

export const deleteCreatedResume = async (resumeId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.jobSeekerId) {
      throw new Error("Unauthorized");
    }
    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userId: session.jobSeekerId,
      },
    });
    if (!resume) {
      throw new Error("Not found");
    }
    if (resume.photoUrl) {
      await del(resume.photoUrl);
    }
    await prisma.resume.delete({
      where: {
        id: resumeId,
        userId: session.jobSeekerId,
      },
    });
    revalidateTag("/job-seeker/design-studio/resume");
    return { success: true, message: "Resume deleted successfully" };
  } catch (error) {
    return handleError({ error: error, errorIn: "deleteCreatedResume" });
  }
};

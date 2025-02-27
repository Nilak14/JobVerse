"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { UTApi } from "uploadthing/server";

export const deleteUploadedResume = async (resumeId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.jobSeekerId) {
      throw new Error("Unauthorized");
    }
    const del = await prisma.userUploadedResume.delete({
      where: { id: resumeId, userId: session.jobSeekerId },
    });
    revalidatePath("/job-seeker/design-studio/resume");
    after(async () => {
      if (del) {
        const key = del.resumeUrl.split("/f/")[1];
        await new UTApi().deleteFiles(key);
      }
    });
    return { success: true, message: "Resume deleted successfully" };
  } catch (error) {
    return handleError({ error: error, errorIn: "deleteUploadedResume" });
  }
};

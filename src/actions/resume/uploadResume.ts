"use server";

import {
  UploadResumeSchema,
  UploadResumeSchemaType,
} from "@/components/Resume/UploadResumeButton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

// const action = createSafeActionClient();

// export const uploadResume = action
//   .schema(UploadResumeSchema)
//   .action(async ({ parsedInput: { resume, title, description } }) => {
//     console.log("test");
//     try {
//       console.log("ehllo bro");

//       const session = await auth();
//       if (!session || !session.user || !session.jobSeekerId) {
//         console.log("error here un");

//         throw new Error("Unauthorized");
//       }
//       const resumeUploadResponse = await new UTApi().uploadFiles(resume);
//       if (!resumeUploadResponse.data?.url && !resumeUploadResponse.data?.key) {
//         console.log("error here");

//         throw new Error("Failed to upload resume");
//       }
//       const cdnFileUrl = `https://${process.env.UPLOADTHING_APP_ID}.ufs.sh/f/${resumeUploadResponse.data.key}`;

//       const uploadedResume = await prisma.userUploadedResume.create({
//         data: {
//           title,
//           description,
//           userId: session.jobSeekerId,
//           resumeUrl: cdnFileUrl,
//         },
//       });

//       if (!uploadedResume) {
//         console.log("error here hahah");

//         await new UTApi().deleteFiles(resumeUploadResponse.data.key);
//         throw new Error("Failed to upload resume");
//       }
//       revalidatePath("/job-seeker/design-studio/resume");
//       return { success: true, message: "Resume uploaded successfully" };
//     } catch (error) {
//       //   return error;
//       throw new Error("Failed to upload resume");
//       //   return handleError({ error, errorIn: "uploadResume" });
//     }
//   });
export async function uploadResume(values: UploadResumeSchemaType) {
  const { resume, title, description } = values;
  try {
    const session = await auth();
    if (!session || !session.user || !session.jobSeekerId) {
      throw new Error("Unauthorized");
    }
    const resumeUploadResponse = await new UTApi().uploadFiles(resume);
    if (!resumeUploadResponse.data?.url && !resumeUploadResponse.data?.key) {
      throw new Error("Failed to upload resume");
    }
    const cdnFileUrl = `https://${process.env.UPLOADTHING_APP_ID}.ufs.sh/f/${resumeUploadResponse.data.key}`;
    const uploadedResume = await prisma.userUploadedResume.create({
      data: {
        title,
        description,
        userId: session.jobSeekerId,
        resumeUrl: cdnFileUrl,
      },
    });
    if (!uploadedResume) {
      await new UTApi().deleteFiles(resumeUploadResponse.data.key);
      throw new Error("Failed to upload resume");
    }
    revalidatePath("/job-seeker/design-studio/resume");
    return { success: true, message: "Resume uploaded successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "uploadResume" });
  }
}

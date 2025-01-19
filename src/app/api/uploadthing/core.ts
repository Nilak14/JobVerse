import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  avatar: f({
    image: {
      maxFileSize: "512KB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth();
      const user = session?.user;
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }
      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const newAvatarUrl = file.url;
      await prisma.user.update({
        where: {
          id: metadata.user.id,
        },
        data: {
          image: newAvatarUrl,
        },
      });
      return { avatarUrl: newAvatarUrl };
    }),
  // company logo upload end point
  companyLogo: f({
    image: { maxFileSize: "512KB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session || !session.user) {
        throw new UploadThingError("Unauthorized");
      }
      return { session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const companyId = file.name.split("_")[2].split(".")[0];

      const company = await prisma.company.findUnique({
        where: {
          id: companyId,
          isDeleted: false,
        },
        select: {
          logoUrl: true,
        },
      });

      if (!company) {
        throw new UploadThingError("Company not found");
      }
      if (company && company.logoUrl) {
        const key = company.logoUrl.split("/f/")[1];
        //   await new UTApi().deleteFiles(key);
        await new UTApi().deleteFiles(key);
      }

      const cdnFileUrl = `https://${process.env.UPLOADTHING_APP_ID}.ufs.sh/f/${file.key}`;
      await prisma.company.update({
        where: {
          id: companyId,
          isDeleted: false,
        },
        data: {
          logoUrl: cdnFileUrl,
        },
      });

      return { cdnFileUrl };
    }),
} satisfies FileRouter;
export type AppFileRouter = typeof fileRouter;

// import prisma from "@/lib/prisma";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError, UTApi } from "uploadthing/server";

// const f = createUploadthing();

// export const fileRouter = {
//   avatar: f({
//     image: {
//       maxFileSize: "512KB",
//     },
//   })
//     .middleware(async ({ req }) => {
//       const session = await auth();
//       const user = session?.user;
//       if (!user) {
//         throw new UploadThingError("Unauthorized");
//       }
//       return { user };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       const newAvatarUrl = file.url;
//       await prisma.user.update({
//         where: {
//           id: metadata.user.id,
//         },
//         data: {
//           image: newAvatarUrl,
//         },
//       });
//       return { avatarUrl: newAvatarUrl };
//     }),
//   // company logo upload end point
//   companyLogo: f({
//     image: { maxFileSize: "512KB" },
//   })
//     .middleware(async () => {
//       const session = await auth();
//       if (!session || !session.user) {
//         throw new UploadThingError("Unauthorized");
//       }
//       return { session };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       // company id is in the file name
//       const companyId = file.name.split("_")[2].split(".")[0];

//       const company = await prisma.company.findUnique({
//         where: {
//           id: companyId,
//         },
//         select: {
//           logoUrl: true,
//         },
//       });
//       if (!company) {
//         throw new UploadThingError("Company not found");
//       }
//       if (company && company.logoUrl) {
//         const key = company.logoUrl.split(
//           `/${process.env.UPLOADTHING_APP_ID}/f/`
//         )[1];
//         await new UTApi().deleteFiles(key);
//       }

//       const logoUrl = file.url;
//       await prisma.company.update({
//         where: {
//           id: companyId,
//         },
//         data: {
//           logoUrl,
//         },
//       });
//       return { logoUrl };
//     }),
// } satisfies FileRouter;
// export type AppFileRouter = typeof fileRouter;

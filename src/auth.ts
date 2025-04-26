import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { cookies } from "next/headers";
import { UserType } from "@prisma/client";
import { discordNewUserRegisterBot } from "./actions/discord_bot/bot";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    error: "/login",
  },
  events: {
    async linkAccount({ user }) {
      const cookieStore = await cookies();
      const cookie = cookieStore.get("type");
      const userType = cookie?.value as UserType;

      await prisma.$transaction(async (prisma) => {
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date(), userType },
        });

        if (userType === "JOB_SEEKER") {
          await prisma.jOB_SEEKER.create({
            data: {
              userId: updatedUser.id,
              JobSeekerProfile: {
                create: {},
              },
            },
          });
        } else if (userType === "EMPLOYER") {
          await prisma.employer.create({
            data: {
              userId: updatedUser.id,
            },
          });
        }
      });
      await discordNewUserRegisterBot({
        name: user.name || "Anonyms User",
        email: user.email || "anonyms@email.com",
        role: userType,
      });
      cookieStore.delete("type");
    },
  },
  trustHost: true,

  session: { strategy: "jwt" },
  ...authConfig,
});

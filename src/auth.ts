import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { cookies } from "next/headers";
import { UserType } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({ user }) {
      const cookieStore = await cookies();
      const cookie = cookieStore.get("type");
      const userType = cookie?.value as UserType;
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(), userType },
      });
      if (updatedUser) {
        cookieStore.delete("type");
      }
    },
  },
  trustHost: true,

  session: { strategy: "jwt" },
  ...authConfig,
});

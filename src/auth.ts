import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { getUserById } from "./data-access/user";
import { UserType } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    error: "/error",
  },

  trustHost: true,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const user = await getUserById(token.sub);
      if (!user) return token;
      token.name = user.name;
      token.email = user.email;
      token.type = user.userType;
      token.avatarUrl = user.image;
      token.isBlocked = user.isBlocked;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      session.user.type = token.type as UserType;
      session.user.avatarUrl = token.avatarUrl as string;
      session.user.isBlocked = token.isBlocked as boolean;

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});

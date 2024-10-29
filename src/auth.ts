import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "./lib/prisma";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),

  ...authConfig,
  callbacks: {
    // session({ session, user }) {
    //   session.user.type = user.type;
    //   return session;
    // },
    signIn({ user, account, profile }) {
      if (account) {
        if (account.provider === "google") {
          console.log("account");

          console.log(account);

          console.log(account.userType);
        } else {
          console.log("no google");
        }
      } else {
        console.log("no account");
      }

      return true;
    },
  },
});

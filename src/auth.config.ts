import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema/LoginSchema";
import { getUserByEmail, getUserById } from "./data-access/user";
import bcryptjs from "bcryptjs";
import { UserType } from "@prisma/client";

export default {
  providers: [
    Google,

    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { identifier, password } = validateFields.data;
          const user = await getUserByEmail(identifier);
          if (!user || !user.password) {
            return null;
          }
          const passwordMatch = await bcryptjs.compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
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
      token.isOAuthUser = !user.password;
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id!);
      if (!existingUser?.emailVerified) {
        throw new Error("Your Email is not verified, Please Verify Your Email");
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      session.user.type = token.type as UserType;
      session.user.avatarUrl = token.avatarUrl as string;
      session.user.isBlocked = token.isBlocked as boolean;
      session.user.isOAuthUser = token.isOAuthUser as boolean;

      return session;
    },
  },
} satisfies NextAuthConfig;

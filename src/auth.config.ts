import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema/LoginSchema";
import { getUserByEmail } from "./data-access/user";
import bcryptjs from "bcryptjs";

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
} satisfies NextAuthConfig;

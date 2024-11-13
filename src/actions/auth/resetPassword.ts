"use server";

import { getUserByEmail } from "@/data-access/user";
import prisma from "@/lib/prisma";
import { PasswordResetSchema } from "@/schema/PasswordResetSchema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const resetPassword = action
  .schema(PasswordResetSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          accounts: true,
        },
      });

      if (!user) {
        return { error: "User not found" };
      }

      if (user.accounts.length > 0) {
        return {
          error:
            "This account is linked with a google account, Please login with that account",
        };
      }

      if (!user.emailVerified) {
        return {
          error: "Your Email is not verified, Please Verify Your Email First",
        };
      }

      // send reset password email
    } catch (error) {
      return { error: "Internal Server Error! Please Try Again" };
    }
  });

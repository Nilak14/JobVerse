"use server";

import { getResetPasswordTokenByToken } from "@/data-access/tokens/resetPasswordToken";
import { getUserByEmail } from "@/data-access/user";
import prisma from "@/lib/prisma";
import { ResetPasswordSchema } from "@/schema/PasswordResetSchema";
import bcrypt from "bcryptjs";
import { createSafeActionClient } from "next-safe-action";
import { unstable_after as after } from "next/server";

const action = createSafeActionClient();

export const resetPassword = action
  .schema(ResetPasswordSchema)
  .action(async ({ parsedInput: { confirmPassword, password, token } }) => {
    try {
      if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
      }
      // check if token is valid or not
      const existingToken = await getResetPasswordTokenByToken(token);
      if (!existingToken) {
        return { error: "Invalid Token" };
      }
      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Token has expired! Please Request for new token" };
      }
      const existingUser = await getUserByEmail(existingToken.email);
      if (!existingUser) {
        return { error: "User not found" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      // delete token in after
      after(async () => {
        await prisma.resetPasswordToken.deleteMany({
          where: { email: existingToken.email },
        });
      });
      return { success: "Password Reset Successfully" };
    } catch (error) {
      return { error: "Internal Server Error" };
    }
  });

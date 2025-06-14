"use server";

import { getEmailVerificationTokenByToken } from "@/data-access/tokens/emailVerificationToken";
import { getUserByEmail } from "@/data-access/user";
import prisma from "@/lib/prisma";
import { after } from "next/server";
export const emailVerification = async (token: string) => {
  try {
    const existingToken = await getEmailVerificationTokenByToken(token);
    if (!existingToken) {
      return { error: "Token not found" };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired" };
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return { error: "User not found" };
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    if (updatedUser) {
      await prisma.emailVerificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    after(async () => {
      await prisma.emailVerificationToken.deleteMany({
        where: {
          email: existingToken.email,
        },
      });
    });

    return { success: "Email Verified" };
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};

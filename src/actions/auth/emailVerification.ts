"use server";

import { getEmailVerificationTokenByToken } from "@/data-access/tokens/emailVerificationToken";
import { getUserByEmail } from "@/data-access/user";
import prisma from "@/lib/prisma";
import { unstable_after as after } from "next/server";

export const emailVerification = async (token: string) => {
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

  after(() => {
    if (updatedUser) {
      prisma.emailVerificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    console.log("after runs");
  });

  return { success: "Email Verified" };
};

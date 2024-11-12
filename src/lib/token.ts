import { randomUUID } from "crypto";
import "server-only";
import prisma from "./prisma";
import { getEmailVerificationTokenByEmail } from "@/data-access/tokens/emailVerificationToken";

export const generateEmailVerificationToken = async (email: string) => {
  const token = randomUUID();

  const expires = new Date(new Date().getTime() + 3600 * 1000); // expire token in 1 hour
  const existingToken = await getEmailVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.emailVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  try {
    const emailVerificationToken = await prisma.emailVerificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return emailVerificationToken.token;
  } catch (error) {
    return null;
  }
};

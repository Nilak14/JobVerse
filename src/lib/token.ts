import { randomUUID, randomInt } from "crypto";
import "server-only";
import prisma from "./prisma";
import { getEmailVerificationTokenByEmail } from "@/data-access/tokens/emailVerificationToken";
import { getResetPasswordTokenByEmail } from "@/data-access/tokens/resetPasswordToken";
import { getTwoFactorTokenByEmail } from "@/data-access/tokens/twoFactorToken";

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

export const generateResetPasswordToken = async (email: string) => {
  try {
    const token = randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // expires in 1 hour
    const existingToken = await getResetPasswordTokenByEmail(email);
    if (existingToken) {
      await prisma.resetPasswordToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    const resetPasswordToken = await prisma.resetPasswordToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return resetPasswordToken.token;
  } catch (error) {
    return null;
  }
};

export const generateTwoFactorToken = async (email: string) => {
  const token = randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000);
  // expires in 15 minutes
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken.token;
};

import prisma from "@/lib/prisma";

export const getEmailVerificationTokenByEmail = async (email: string) => {
  try {
    const emailVerificationToken =
      await prisma.emailVerificationToken.findFirst({
        where: {
          email,
        },
      });
    return emailVerificationToken;
  } catch (error) {
    return null;
  }
};
export const getEmailVerificationTokenByToken = async (token: string) => {
  try {
    const emailVerificationToken =
      await prisma.emailVerificationToken.findFirst({
        where: {
          token,
        },
      });
    return emailVerificationToken;
  } catch (error) {
    return null;
  }
};

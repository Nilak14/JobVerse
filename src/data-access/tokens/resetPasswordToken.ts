import prisma from "@/lib/prisma";

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: { email },
    });
    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};
export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: { token },
    });
    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};

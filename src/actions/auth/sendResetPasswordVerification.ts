"use server";

import { sendResetPasswordLink as sendResetPasswordLinkEmail } from "@/lib/emails";
import prisma from "@/lib/prisma";
import { generateResetPasswordToken } from "@/lib/token";

export const sendResetPasswordVerification = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      return { error: "Couldn't found the user with this email" };
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
    const token = await generateResetPasswordToken(email);
    if (token === null) {
      return { error: "Error Generating Token" };
    }
    const error = await sendResetPasswordLinkEmail({ token, email });
    if (error) {
      return { error: "Error Sending Email" };
    } else {
      return {
        success: "Reset Password Email Sent, Please Check Your Email",
      };
    }
  } catch (error) {
    return {
      error:
        "Unable to send reset password verification link, Please try again",
    };
  }
};

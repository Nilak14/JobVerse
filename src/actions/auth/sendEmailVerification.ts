"use server";

import { getUserByEmail } from "@/data-access/user";
import { sendEmailVerificationLink as sendEmail } from "@/lib/emails";
import { generateEmailVerificationToken } from "@/lib/token";

export const sendEmailVerificationLink = async (
  email: string,
  name: string | null
) => {
  try {
    let username;
    if (!name) {
      const user = await getUserByEmail(email);
      username = user?.name;
    }
    const fullName = name || username || "User";
    const token = await generateEmailVerificationToken(email);
    if (token === null) {
      return { error: "Error Generating Token" };
    }
    const error = await sendEmail({ email, name: fullName, token });
    if (error) {
      return { error: "Error Sending Email" };
    } else {
      return { success: "Confirmation Email Sent, Please Check Your Email" };
    }
  } catch (error) {
    return {
      error: "Unable To send Email verification link, Please try again",
    };
  }
};

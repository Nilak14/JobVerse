"use server";
import { sendTwoFactorCode as sendEmail } from "@/lib/emails";
import { generateTwoFactorToken } from "@/lib/token";

export const sendTwoFactorCode = async (email: string) => {
  try {
    const code = await generateTwoFactorToken(email);
    if (code === null) {
      return { error: "Error Generating Two Factor Code" };
    }
    const error = await sendEmail({ email, token: code });
    if (error) {
      return { error: "Error Sending Two Factor Code" };
    } else {
      return { success: "Two Factor Code Sent, Please Check Your Email" };
    }
  } catch (error) {
    console.log(error);

    return {
      error: "Unable To send Two Factor Code, Please try again",
    };
  }
};

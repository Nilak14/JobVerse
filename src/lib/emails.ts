import "server-only";
import { Resend } from "resend";
import VerifyEmailTemplate from "@/template/emails/verify-email";
import ResetPasswordTemplate from "@/template/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerificationLink = async ({
  name,
  token,
  email,
}: {
  name: string;
  token: string;
  email: string;
}) => {
  const emailVerificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

  const { error } = await resend.emails.send({
    from: "JobVerse@jobverse.me",
    to: email,
    subject: "JobVerse Email Verification",
    react: VerifyEmailTemplate({ name, link: emailVerificationLink }),
  });
  return error;
};

export const sendResetPasswordLink = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/password-reset?token=${token}`;
  const { error } = await resend.emails.send({
    from: "JobVerse@jobverse.me",
    to: email,
    subject: "Reset Your JobVerse Password",
    react: ResetPasswordTemplate({ link: resetPasswordLink }),
  });
  return error;
};

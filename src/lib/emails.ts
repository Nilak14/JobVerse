import "server-only";
import { Resend } from "resend";
import VerifyEmailTemplate from "@/template/emails/verify-email";
import ResetPasswordTemplate from "@/template/emails/reset-password";
import TwoFactorEmailTemplate from "@/template/emails/two-factor-email";
import ApplicationStatusTemplate, {
  ApplicationStatusTemplateProps,
} from "@/template/emails/application-update";

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

export const sendTwoFactorCode = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const { error } = await resend.emails.send({
    from: "JobVerse@jobverse.me",
    to: email,
    subject: `Your JobVerse Two Factor Code: ${token}`,
    react: TwoFactorEmailTemplate({ token }),
  });
  return error;
};
export const sendApplicationUpdateEmail = async ({
  candidateName,
  baseUrl,
  companyName,
  jobTitle,
  status,
  interviewDetails,
  email,
}: ApplicationStatusTemplateProps) => {
  const { error } = await resend.emails.send({
    from: "JobVerse@jobverse.me",
    to: email!,
    subject: `Application Update: ${status}`,
    react: ApplicationStatusTemplate({
      baseUrl,
      candidateName,
      companyName,
      jobTitle,
      status,
      interviewDetails,
    }),
  });
  return error;
};

"use server";

import { sendApplicationUpdateEmail as sendEmail } from "@/lib/emails";
import { ApplicationStatusTemplateProps } from "@/template/emails/application-update";

export const sendApplicationUpdateEmails = async (
  props: ApplicationStatusTemplateProps
) => {
  try {
    const error = await sendEmail(props);
    if (error) {
      return { error: "Error Sending Email" };
    } else {
      return { success: "Email Sent" };
    }
  } catch (error) {
    return {
      error: "Unable To send Application Update Email, Please try again",
    };
  }
};

import { formatDate } from "../utils";

interface JobApplicationSlackNotificationBlockParams {
  jobTitle: string;
  applicantName: string;
  jobId: string;
}
export const JobApplicationSlackNotificationBlock = ({
  applicantName,
  jobId,
  jobTitle,
}: JobApplicationSlackNotificationBlockParams) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/employer/applicants?jobId=${jobId}`;
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📩 New Job Application Received!",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `📌 Job Title: ${jobTitle}`,
        },
        {
          type: "mrkdwn",
          text: `👤 Applicant: ${applicantName}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "A new candidate has applied for your job posting. Click the button below to review their application details.",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "View Applicants",
            emoji: true,
          },
          style: "primary",
          url: `${url}`,
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `🔔 Received on *${formatDate(new Date())}*`,
        },
      ],
    },
  ];
};

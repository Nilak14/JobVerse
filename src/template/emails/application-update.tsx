import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

export interface ApplicationStatusTemplateProps {
  candidateName: string;
  companyName: string;
  baseUrl: string;
  jobTitle: string;
  status: "accepted" | "interview" | "rejected";
  interviewDetails?: {
    date: string;
    time: string;
    type: string;
    note?: string;
  };
  email?: string;
}

const ApplicationStatusTemplate = ({
  candidateName = "John Doe",
  baseUrl = "https://jobverse.me",
  companyName = "Acme Inc",
  jobTitle = "Software Engineer",
  status = "accepted",
  interviewDetails = {
    date: "May 15, 2025",
    time: "2:00 PM EST",
    type: "Video",
    note: "Please be prepared to discuss your resume and experience.",
  },
}: ApplicationStatusTemplateProps) => {
  const statusConfig = {
    accepted: {
      color: "#e9590c",
      title: "Application Update: Accepted",
      previewText: `Good news regarding your ${jobTitle} application at ${companyName}`,
      message: `We’re reaching out to inform you that there is an update on your application for the ${jobTitle} role at ${companyName}. The employer has confirmed that your application has been accepted. Congratulations on this positive development!`,

      additionalText:
        "Please log in to your account for further details on the next steps in the hiring process.",
    },
    interview: {
      color: "#e9590c",
      title: "Application Update: Interview Scheduled",
      previewText: `Interview scheduled for your ${jobTitle} application at ${companyName}`,
      message: `We’d like to update you on your application for the ${jobTitle} position at ${companyName}. The employer has moved your application to the interview stage and an interview has been scheduled. Please check your account for more details and to confirm your availability.`,

      additionalText:
        "If you need any adjustments with the interview timing, please contact us promptly.",
    },
    rejected: {
      color: "red",
      title: "Application Update: Status Update",
      previewText: `Update regarding your ${jobTitle} application at ${companyName}`,
      message: `We are writing to update you on your application for the ${jobTitle} position at ${companyName}. After careful review, the employer has decided to move forward with other candidates at this time. We appreciate your interest and encourage you to explore other opportunities on our platform.`,

      additionalText:
        "Thank you for using our service. We wish you the best in your job search and future endeavors.",
    },
  };

  const currentStatus = statusConfig[status];
  return (
    <Html>
      <Head />
      <Preview>{currentStatus.previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded mx-auto p-[20px] max-w-[465px] relative mt-10">
            <Section className="bg-black relative py-6 h-[80px]">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center" valign="middle">
                    <Img
                      src="https://utfs.io/f/AxbCfMURBwL11wIuavQdKomzIhEBq659AJPs84VuLCUlgMRc"
                      alt="JV"
                      height={40}
                      width={40}
                      title="JobVerse"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    />
                    <span
                      style={{
                        color: "white",
                        fontSize: "24px",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                        display: "inline-block",
                      }}
                    >
                      JobVerse
                    </span>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Status indicator */}
            <Section className="mt-[30px]">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center">
                    <div
                      style={{
                        backgroundColor: currentStatus.color,
                        borderRadius: "4px",
                        padding: "6px 12px",
                        display: "inline-block",
                      }}
                    >
                      <Text className="text-white text-[14px] font-bold m-0">
                        {status === "accepted"
                          ? "Application Accepted"
                          : status === "interview"
                            ? "Interview Scheduled"
                            : "Rejected"}
                      </Text>
                    </div>
                  </td>
                </tr>
              </table>
            </Section>

            <Heading className="text-black text-[24px] font-normal text-center p-0 mt-[30px] mx-0">
              <strong>{currentStatus.title}</strong>
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{candidateName},</strong>
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              {currentStatus.message}
            </Text>

            {/* Interview details section - only shown for interview status */}
            {status === "interview" && interviewDetails && (
              <Section className="bg-[#f3f4f6] p-[15px] rounded-[4px] mt-[20px]">
                <Text className="text-black text-[16px] font-bold m-0 mb-[10px]">
                  Interview Details:
                </Text>
                <table
                  role="presentation"
                  width="100%"
                  style={{ borderCollapse: "collapse" }}
                >
                  <tr>
                    <td
                      width="30%"
                      valign="top"
                      className="text-[14px] text-[#4b5563] py-[5px]"
                    >
                      Date:
                    </td>
                    <td className="text-[14px] text-black font-medium py-[5px]">
                      {interviewDetails.date}
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="30%"
                      valign="top"
                      className="text-[14px] text-[#4b5563] py-[5px]"
                    >
                      Time:
                    </td>
                    <td className="text-[14px] text-black font-medium py-[5px]">
                      {interviewDetails.time}
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="30%"
                      valign="top"
                      className="text-[14px] text-[#4b5563] py-[5px]"
                    >
                      Interview Type:
                    </td>
                    <td className="text-[14px] text-black font-medium py-[5px]">
                      {interviewDetails.type}
                    </td>
                  </tr>
                  {interviewDetails.note && (
                    <tr>
                      <td
                        width="30%"
                        valign="top"
                        className="text-[14px] text-[#4b5563] py-[5px]"
                      >
                        Note:
                      </td>
                      <td className="text-[14px] text-black font-medium py-[5px]">
                        {interviewDetails.note}
                      </td>
                    </tr>
                  )}
                </table>
              </Section>
            )}

            <Text className="text-black text-[14px] leading-[24px]">
              {currentStatus.additionalText}
            </Text>

            {status === "rejected" && (
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className={`bg-[${currentStatus.color}] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3`}
                  href={`${baseUrl}/job`}
                >
                  Explore More Jobs
                </Button>
              </Section>
            )}

            <Text className="text-black text-[14px] leading-[24px]">
              You can also view your application status by visiting your
              JobVerse dashboard:{" "}
              <Link
                href={`${baseUrl}/job-seeker/applied-jobs`}
                className="text-blue-600 no-underline"
              >
                <span className="break-all">Click Here</span>
              </Link>
            </Text>

            <Hr className="border border-solid border-[#eaeaea] mt-[26px] mx-0 w-full" />
            <Text>
              Thanks, <br />
              The JobVerse Team
            </Text>
          </Container>
        </Body>
        <Container className="border-[#eaeaea] rounded mx-auto p-[20px] max-w-[465px] relative">
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            You're receiving this email because you applied for a job through
            JobVerse. If you believe this is a mistake, please contact support.
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
};

export default ApplicationStatusTemplate;

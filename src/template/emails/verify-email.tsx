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
interface VerifyEmailTemplateProps {
  link: string;
  name: string;
}

const VerifyEmailTemplate = ({
  link = "https://jobverse.medddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  name = "nilak pathak",
}: VerifyEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{"Verify Your Email"}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded  mx-auto p-[20px] max-w-[465px] relative my-10">
            <Section className="bg-black relative py-6 h-[80px] ">
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
            <Heading className="text-black text-[24px] font-normal text-center p-0 mt-[80px] mx-0">
              <strong> Verify Your Email Address</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hi <span className="capitalize font-bold">{name}, </span> please
              verify your email to complete your JobVerse registration. Click
              the button below to confirm your account and start exploring new
              opportunities!,
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#e9590c] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={link}
              >
                Verify Email Address
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={link} className="text-blue-600 no-underline">
                <span className="break-all">{link}</span>
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This Email Verification was intended for{" "}
              <span className="text-black capitalize">{name}</span>. This
              verification link was sent by{" "}
              <span className="text-black">JobVerse</span> to verify your email
              If you were not expecting this invitation, you can ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default VerifyEmailTemplate;

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
interface TwoFactorEmailTemplateProps {
  token: string;
}

const TwoFactorEmailTemplate = ({ token }: TwoFactorEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{"Two Factor Code"}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded  mx-auto p-[20px] max-w-[465px] relative mt-10">
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
            <Heading className="text-black text-[20px] font-normal text-center p-0 mt-[80px] mx-0">
              <strong>
                {" "}
                Enter the following code to continue with your JobVerse Account
              </strong>
            </Heading>

            <Section className="bg-slate-200 rounded-md w-[200px]">
              <Text className="text-xl font-bold tabular-nums text-center tracking-[10px]">
                {token}
              </Text>
            </Section>
            <Text className="text-white font-semibold text-center bg-red-500 py-2 rounded-md">
              To protect your account, do not share this code.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] mt-[26px] mx-0 w-full" />
            <Text>
              Thanks, <br />
              The Jobverse Team
            </Text>
          </Container>
        </Body>
        <Container className=" border-[#eaeaea] rounded  mx-auto p-[20px] max-w-[465px] relative">
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            You're receiving this email because you requested a two factor code
            for your Jobverse account.
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
};
export default TwoFactorEmailTemplate;

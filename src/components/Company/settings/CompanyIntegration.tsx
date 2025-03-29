import { CompanyInclude } from "@/lib/prisma-types/Company";
import { Session } from "next-auth";
import { getSlackChannel } from "@/actions/slack/getSlackChannel";
import SlackIntegration from "./SlackIntegration";
import { disconnectSlack } from "@/actions/slack/disconnectSlack";

interface CompanyIntegrationProps {
  session: Session;
  activeCompany: CompanyInclude;
}
const CompanyIntegration = async ({
  activeCompany,
  session,
}: CompanyIntegrationProps) => {
  const channels = await getSlackChannel();
  // if (activeCompany.slackAccessToken && !activeCompany.slackChannelId) {
  //   await disconnectSlack();
  // }
  return <SlackIntegration activeCompany={activeCompany} channels={channels} />;
};
export default CompanyIntegration;

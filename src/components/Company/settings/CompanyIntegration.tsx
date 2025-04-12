import { CompanyInclude } from "@/lib/prisma-types/Company";
import { Session } from "next-auth";
import { getSlackChannel } from "@/actions/slack/getSlackChannel";
import SlackIntegration from "./SlackIntegration";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompanySettingsHeader from "./CompanySettingsHeader";
import LinkedinIntegration from "./LinkedinIntegration";
import { Separator } from "@/components/ui/separator";
interface CompanyIntegrationProps {
  session: Session;
  activeCompany: CompanyInclude;
}
const CompanyIntegration = async ({
  activeCompany,
  session,
}: CompanyIntegrationProps) => {
  const channels = await getSlackChannel();

  return (
    <>
      <CompanySettingsHeader
        title="Integrations"
        description="Connect your company with other tools and services"
      />
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect your company with other tools and services
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5">
          <div>
            <SlackIntegration
              activeCompany={activeCompany}
              channels={channels}
            />
            <Separator className="my-5" />
            <LinkedinIntegration activeCompany={activeCompany} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default CompanyIntegration;

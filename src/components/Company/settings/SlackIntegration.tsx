"use client";
import { SlackChannel } from "@/actions/slack/getSlackChannel";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CompanySettingsHeader from "./CompanySettingsHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slack, Send, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sendTestMessage } from "@/actions/slack/sendTestMessage";
import { updateSlackChannel } from "@/actions/slack/updateSlackChannel";
import { disconnectSlack } from "@/actions/slack/disconnectSlack";
interface SlackIntegrationProps {
  activeCompany: CompanyInclude;
  channels: SlackChannel[];
}
const SlackIntegration = ({
  activeCompany,
  channels,
}: SlackIntegrationProps) => {
  const searchParams = useSearchParams();
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>(
    activeCompany?.slackChannelId || ""
  );
  const router = useRouter();
  const [testMessage, setTestMessage] = useState<string>(
    `Hello from ${activeCompany.name}! This is a test message.`
  );
  const [testStatus, setTestStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [step, setStep] = useState<"select" | "test" | "success">("select");

  useEffect(() => {
    if (
      searchParams.get("showChannels") === "true" &&
      activeCompany.slackAccessToken
    ) {
      setShowChannelModal(true);
    }
  }, [searchParams, activeCompany.slackAccessToken]);

  const handleChannelChange = (channelId: string) => {
    setSelectedChannel(channelId);
  };

  // handle send test message to the selected channel
  const handleSendTestMessage = async () => {
    setTestStatus("sending");
    try {
      const res = await sendTestMessage({
        channelId: selectedChannel,
        message: testMessage,
      });
      if (res.success) {
        toast.success(res.message, { id: "test-message" });
        setTestStatus("success");
        setStep("success");
      } else {
        setTestStatus("error");
        toast.error(res.message, { id: "test-message" });
      }
    } catch (error) {
      setTestStatus("error");
      toast.error("Error sending test message");
    }
  };

  // handle save channel after selecting the channel

  const handleSaveChannel = async () => {
    try {
      const res = await updateSlackChannel({ channelId: selectedChannel });
      if (res.success) {
        toast.success(res.message, { id: "save-channel" });
        setShowChannelModal(false);
        router.refresh();
      } else {
        toast.error(res.message, { id: "save-channel" });
      }
    } catch (error) {
      toast.error("Error saving channel", { id: "save-channel" });
    }
  };
  const handleSlackDisconnect = async () => {
    try {
      const res = await disconnectSlack();
      if (res.success) {
        toast.success(res.message, { id: "disconnect-slack" });
        router.refresh();
      } else {
        toast.error(res.message, { id: "disconnect-slack" });
      }
    } catch (error) {
      toast.error("Error disconnecting Slack", { id: "disconnect-slack" });
    }
  };
  const slackRedirectURI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/slack`;
  const slackURL = `https://slack.com/oauth/v2/authorize?scope=channels:read,groups:read,chat:write,chat:write.public&client_id=${
    process.env.NEXT_PUBLIC_SLACK_CLIENT_ID ?? ""
  }&redirect_uri=${
    slackRedirectURI.startsWith("http://")
      ? `https://redirectmeto.com/${slackRedirectURI}`
      : slackRedirectURI
  }`;
  const selectedChannelName =
    channels.find((c) => c.id === selectedChannel)?.name || "";

  return (
    <div>
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
          <div className="flex lg:items-center items-start justify-between lg:flex-row flex-col gap-5">
            <div className="flex gap-3 items-center">
              <Slack className="size-6" />
              <div>
                <p>Integrate Slack</p>
                <p className="text-muted-foreground text-sm">
                  Integrate your company with Slack to receive notifications and
                  updates directly in your Slack channels.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              {activeCompany.slackAccessToken ? (
                <div className="flex items-center gap-2">
                  {activeCompany.slackChannelId ? (
                    <div className="flex items-center gap-2">
                      <div className="text-sm bg-muted px-3 py-1.5 rounded-md">
                        #{selectedChannelName}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowChannelModal(true)}
                      >
                        Change Channel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSlackDisconnect}
                        className="text-destructive hover:text-destructive"
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Select
                      value={selectedChannel}
                      onValueChange={handleChannelChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {channels.map((channel) => (
                          <SelectItem key={channel.id} value={channel.id}>
                            #{channel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ) : (
                <Button asChild>
                  <a href={slackURL}>Connect Slack</a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel Selection and Test Message Modal */}
      <Dialog open={showChannelModal} onOpenChange={setShowChannelModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {step === "select" && "Select Slack Channel"}
              {step === "test" && "Send Test Message"}
              {step === "success" && "Channel Connected"}
            </DialogTitle>
            <DialogDescription>
              {step === "select" &&
                "Choose a Slack channel to receive notifications"}
              {step === "test" &&
                "Send a test message to verify the integration"}
              {step === "success" && "Your Slack integration is now complete"}
            </DialogDescription>
          </DialogHeader>

          {step === "select" && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="channel">Slack Channel</Label>
                  <Select
                    value={selectedChannel}
                    onValueChange={handleChannelChange}
                  >
                    <SelectTrigger id="channel">
                      <SelectValue placeholder="Select Channel" />
                    </SelectTrigger>
                    <SelectContent>
                      {channels.map((channel) => (
                        <SelectItem key={channel.id} value={channel.id}>
                          #{channel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowChannelModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep("test")}
                  disabled={!selectedChannel}
                >
                  Next
                </Button>
              </DialogFooter>
            </>
          )}

          {step === "test" && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="test-message">Test Message</Label>
                  <Input
                    id="test-message"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Enter a test message"
                  />
                  <p className="text-sm text-muted-foreground">
                    This message will be sent to #{selectedChannelName}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setStep("select")}>
                  Back
                </Button>
                <Button
                  onClick={handleSendTestMessage}
                  disabled={testStatus === "sending" || !testMessage.trim()}
                >
                  {testStatus === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Message
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}

          {step === "success" && (
            <>
              <div className="grid gap-4 py-4">
                <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400">
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    Test message sent successfully to #{selectedChannelName}
                  </AlertDescription>
                </Alert>
                <p className="text-sm">
                  Your Slack integration is now complete. You will receive
                  notifications in the selected channel.
                </p>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveChannel}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Channel
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SlackIntegration;

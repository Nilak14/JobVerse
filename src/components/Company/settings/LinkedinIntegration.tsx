"use client";

import { linkedinDisconnect } from "@/actions/linkedin/disconnectLinkedin";
import { Button } from "@/components/ui/button";
import LinkedinButton from "@/components/ui/LinkedinButton";
import { useQueryGetCompanyLinkedinStatus } from "@/hooks/query-hooks/getCompanyLinkedinStatus";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { formatDate, LinkedInRedirectUri } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { toast } from "sonner";

const scope = "email w_member_social openid";

interface LinkedinIntegrationProps {
  activeCompany: CompanyInclude;
}

const LinkedinIntegration = ({ activeCompany }: LinkedinIntegrationProps) => {
  const searchParams = useSearchParams();
  const resType = searchParams.get("linkedin");
  const message = searchParams.get("message");
  const { data, isLoading } = useQueryGetCompanyLinkedinStatus(
    activeCompany.id
  );
  const queryClient = useQueryClient();
  const handleLinkedinConnect = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${LinkedInRedirectUri}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const handleLinkedinDisconnect = async () => {
    try {
      const res = await linkedinDisconnect();
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["linkedin-status", activeCompany.id],
        });
        toast.success(res.message, { id: "linkedin" });
      } else {
        toast.error(res.message, { id: "linkedin" });
      }
    } catch (error) {
      toast.error("Failed to disconnect LinkedIn", { id: "linkedin" });
    }
  };

  const isConnected = !!data?.data;
  const isExpired = isConnected && new Date(data.data.expiresAt) < new Date();

  useEffect(() => {
    if (isConnected && isExpired) {
      handleLinkedinDisconnect();
    }
  }, [isConnected, isExpired]);

  useEffect(() => {
    if (resType === "success") {
      toast.success("LinkedIn connected successfully!", { id: "linkedin" });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (resType === "error") {
      toast.error(message || "LinkedIn Connection Failed", {
        id: "linkedin",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [resType, message]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex gap-3 items-start sm:items-center flex-1">
            <FaLinkedin className="size-6 mt-1 sm:mt-0 flex-shrink-0" />
            <div>
              <p className="font-medium">Integrate Linkedin</p>
              <p className="text-muted-foreground text-sm">
                Connect your company with Linkedin to post jobs in your linkedin
                page directly from JobVerse.
              </p>
              {isConnected && !isExpired && (
                <p className="text-sm text-green-600 mt-1">
                  Connected (Expires On: {formatDate(data.data.expiresAt)})
                </p>
              )}
              {isConnected && isExpired && (
                <p className="text-sm text-red-600 mt-1">
                  Connection expired on {formatDate(data.data.expiresAt)}.
                  Please reconnect to continue using the integration.
                </p>
              )}
            </div>
          </div>
          <div className="w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0 sm:self-center">
            {isLoading ? (
              <LinkedinButton
                variant="disconnected"
                text="Loading..."
                className="w-full sm:w-auto"
              />
            ) : isConnected && !isExpired ? (
              <LinkedinButton
                onClick={handleLinkedinDisconnect}
                variant="connected"
                text="Disconnect"
                className="w-full sm:w-auto"
              />
            ) : (
              <LinkedinButton
                onClick={handleLinkedinConnect}
                variant="disconnected"
                text="Connect LinkedIn"
                className="w-full sm:w-auto"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedinIntegration;

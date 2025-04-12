"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LinkedInRedirectUri } from "@/lib/utils";
import { postToLinkedIn } from "@/actions/linkedin/post";

const scope = "email w_member_social openid";

const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const ConnectLinkedin = () => {
  const searchParams = useSearchParams();
  const resType = searchParams.get("linkedin");
  const message = searchParams.get("message");

  const handleConnect = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${LinkedInRedirectUri}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    if (resType === "success") {
      toast.success("LinkedIn connected successfully!", { id: "linkedin" });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (resType === "error") {
      toast.error(message || "LinkedIn Connection Failed", { id: "linkedin" });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [message, resType]);
  const [loading, setLoading] = useState(false);

  const postInLinkedin = async () => {
    try {
      setLoading(true);
      const post = await postToLinkedIn("dfd");
      if (post.success) {
        toast.success(post.message, { id: "linkedin" });
      } else {
        toast.error(post.message, { id: "linkedin" });
      }
    } catch (error) {
      toast.error("Failed to post on LinkedIn", { id: "linkedin" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Connect LinkedIn</h1>
      <p className="mb-4 text-muted-foreground">
        Authorize your LinkedIn app to post on behalf of your company page.
      </p>
      <Button onClick={handleConnect}>Authorize with LinkedIn</Button>
      <Button onClick={postInLinkedin} className="mt-10 block">
        Post Random Stuff
      </Button>
    </div>
  );
};
export default ConnectLinkedin;

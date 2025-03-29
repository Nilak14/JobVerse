import { signOut } from "@/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      await signOut();
      return;
    }
    const url = req.nextUrl;
    const code = url.searchParams.get("code") || "";
    if (!code) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/employer/company/setting?error=no_code`
      );
    }
    const slackRedirectURI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/slack`;
    const response = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID ?? "",
        client_secret: process.env.SLACK_CLIENT_SECRET ?? "",
        code,
        redirect_uri: slackRedirectURI.startsWith("http://")
          ? `https://redirectmeto.com/${slackRedirectURI}`
          : slackRedirectURI,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!data.ok) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/employer/company/setting?error=slack_error`
      );
    }
    await prisma.company.update({
      where: {
        id: session.activeCompanyId,
      },
      data: {
        slackAccessToken: data.access_token,
      },
    });
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/employer/company/setting?showChannels=true`
    );
  } catch (error) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/employer/company/setting?error=server_error`
    );
  }
};

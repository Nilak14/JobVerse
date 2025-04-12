import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LinkedInRedirectUri } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const redirectResponse = `${process.env.NEXT_PUBLIC_BASE_URL}/employer/company/setting`;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      return NextResponse.redirect(
        `${redirectResponse}?linkedin=error&message=not_authenticated`
      );
    }
    if (error) {
      console.log("LinkedIn error:", error);
      return NextResponse.redirect(
        `${redirectResponse}?linkedin=error&message=error_code`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${redirectResponse}?linkedin=error&message=missing_code`
      );
    }

    // Exchange code for access token
    const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: LinkedInRedirectUri,
        client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      }),
    });

    const data = await res.json();
    if (data.error) {
      console.log("LinkedIn error:", data?.error_description);
      return NextResponse.redirect(
        `${redirectResponse}?linkedin=error&message=${data.error}`
      );
    }
    const accessToken = data.access_token;
    const expiresIn = data.expires_in; // in seconds
    console.log(data);
    if (!accessToken) {
      return NextResponse.redirect(
        `${redirectResponse}?linkedin=error&message=missing_token`
      );
    }
    const companyId = session.activeCompanyId;
    await prisma.linkedInToken.upsert({
      where: { companyId },
      create: {
        accessToken: accessToken,
        expiresAt: new Date(Date.now() + expiresIn * 1000),
        companyId,
      },
      update: {
        accessToken: accessToken,
        expiresAt: new Date(Date.now() + expiresIn * 1000),
        companyId,
      },
    });

    return NextResponse.redirect(
      `${redirectResponse}?linkedin=success&message=connected`
    );
  } catch (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/settings?linkedin=error&message=server_error`
    );
  }
}

"use server";

import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";

interface PostToLinkedInParams {
  caption: string;
  companyId: string;
}
export const postToLinkedIn = async ({
  caption,
  companyId,
}: PostToLinkedInParams) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        logoUrl: true,
        adminEmployer: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!company) {
      return;
    }

    const token = await prisma.linkedInToken.findFirst({
      where: {
        companyId: companyId,
      },
      select: {
        accessToken: true,
        expiresAt: true,
      },
    });
    console.log("token", token);
    if (!token) {
      const notification = await prisma.notifications.create({
        data: {
          title: "Couldn't post to LinkedIn",
          body: "Connect LinkedIn account to post in LinkedIn for future posts",
          category: "JOB_STATUS",
          userId: company.adminEmployer.userId,
          imageURL: company.logoUrl,
        },
        select: getNotificationSelect(),
      });
      triggerNotification(company.adminEmployer.userId, notification);
      return;
    }
    const hasExpired = new Date(token.expiresAt) < new Date();
    if (hasExpired) {
      const notification = await prisma.notifications.create({
        data: {
          title: "Couldn't post to LinkedIn",
          body: "LinkedIn token has expired. Please reconnect your LinkedIn account",
          category: "JOB_STATUS",
          userId: company.adminEmployer.userId,
          imageURL: company.logoUrl,
        },
        select: getNotificationSelect(),
      });
      triggerNotification(company.adminEmployer.userId, notification);
      return;
    }
    const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const profileData = await profileRes.json();
    console.log("profileData", profileData);
    if (!profileData.sub) {
      console.log("Error fetching profile data:", profileData);
      return;
    }
    const authorUrn = `urn:li:person:${profileData.sub}`;
    const postRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: authorUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: caption,
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      }),
    });
    const postData = await postRes.json();
    console.log("postData", postData);
    if (postRes.ok) {
      const notification = await prisma.notifications.create({
        data: {
          title: "LinkedIn post successful",
          body: "Post has been published successfully to LinkedIn",
          category: "JOB_STATUS",
          userId: company.adminEmployer.userId,
          imageURL: company.logoUrl,
        },
        select: getNotificationSelect(),
      });
      triggerNotification(company.adminEmployer.userId, notification);
      return;
    } else {
      const notification = await prisma.notifications.create({
        data: {
          title: "Couldn't post to LinkedIn",
          body: "Connect LinkedIn account to post in LinkedIn for future posts",
          category: "JOB_STATUS",
          userId: company.adminEmployer.userId,
          imageURL: company.logoUrl,
        },
        select: getNotificationSelect(),
      });
      triggerNotification(company.adminEmployer.userId, notification);
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

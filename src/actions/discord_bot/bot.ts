"use server";

import { JobVerseLogoUrl } from "@/lib/utils";
import { UserType } from "@prisma/client";

interface NewUserRegistrationBotParams {
  name: string;
  role: UserType;
  email: string;
}

export const discordNewUserRegisterBot = async ({
  email,
  name,
  role,
}: NewUserRegistrationBotParams) => {
  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "New User Alert",
        avatar_url: JobVerseLogoUrl,
        embeds: [
          {
            title: "New User Registration Notification",
            description:
              "A new user has successfully registered on your website. Check the details below for updated stats.",
            color: 0xffa500,
            fields: [
              {
                name: "User Name",
                value: name,
                inline: false,
              },
              {
                name: "User Role",
                value: role,
                inline: true,
              },
              {
                name: "User Email",
                value: email,
                inline: true,
              },
            ],
            footer: {
              text: "Registration Stats Notification",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Error sending registration notification:", error);
  }
};

interface DiscordCronJobBotParams {
  type: "JOB_EXPIRED";
  success: boolean;
  message: string;
}

export const discordCronJobBot = async ({
  message,
  success,
  type,
}: DiscordCronJobBotParams) => {
  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "JobVerse Cron Monitor",
        avatar_url: JobVerseLogoUrl,
        embeds: [
          {
            title: "Cron Job Execution Notification",
            description: message,
            color: success ? 0x00ff00 : 0xff0000,
            fields: [
              {
                name: "Cron Type",
                value: type,
                inline: true,
              },
              {
                name: "Execution Status",
                value: success ? "Success" : "Failure",
                inline: true,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Error sending cron job notification:", error);
  }
};

export interface DiscordSubscriptionBotParams {
  userType: "COMPANY" | "JOB_SEEKER";
  priceId: string;
  action: "CREATED/UPDATED" | "DELETED";
}

export const discordSubscriptionBot = async ({
  userType,
  priceId,
  action,
}: DiscordSubscriptionBotParams) => {
  try {
    const ProPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY;
    const ElitePriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY;

    const subscriptionType =
      ProPriceId === priceId
        ? "Pro"
        : ElitePriceId === priceId
          ? "Elite"
          : "Unknown";

    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "JobVerse Subscription Monitor",
        avatar_url: JobVerseLogoUrl,
        embeds: [
          {
            title:
              action === "DELETED"
                ? "Subscription Cancelled"
                : "New Subscription Activated/Updated",
            description:
              action === "DELETED"
                ? "A subscription has been cancelled."
                : "A subscription has been activated or updated.",
            color: action === "DELETED" ? 0xff0000 : 0x00ff00,
            fields: [
              {
                name: "User Type",
                value: userType,
                inline: true,
              },
              {
                name: "Subscription Plan",
                value: subscriptionType,
                inline: true,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Error sending subscription discord notification:", error);
  }
};

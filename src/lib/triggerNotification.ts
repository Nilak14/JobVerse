"use server";

import { NotificationType } from "./prisma-types/Notification";
import { getPusherInstance } from "./pusher/server";

const pusherServer = getPusherInstance();
export const triggerNotification = async (
  userId: string,
  notification: NotificationType
) => {
  await pusherServer.trigger(`n-${userId}`, "notifications", {
    notification,
  });
};

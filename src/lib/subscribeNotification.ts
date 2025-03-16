import { pusherClient } from "./pusher/client";

export const subscribeNotification = (userId: string) => {
  return pusherClient.subscribe(`n-${userId}`);
};

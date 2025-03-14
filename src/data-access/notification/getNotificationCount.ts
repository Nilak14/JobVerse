import { signOut } from "@/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cache } from "react";

export const getUnreadNotificationCount = cache(async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    await signOut();
    return;
  }
  return await prisma.notifications.count({
    where: {
      userId: session.user.id,
      isRead: false,
    },
  });
});

"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const markAllNotificationsAsRead = async () => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthenticated");
    }
    await prisma.notifications.updateMany({
      where: {
        userId: session.user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
    return { success: true, message: "All notifications marked as read" };
  } catch (error) {
    return handleError({ error, errorIn: "updateApplicationStatus" });
  }
};

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  getNotificationSelect,
  NotificationAPIResponse,
} from "@/lib/prisma-types/Notification";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const PAGE_SIZE = 5 as const;
    const session = await auth();
    const user = session?.user;
    if (!user || !user.id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const notifications = await prisma.notifications.findMany({
      where: {
        userId: user.id,
      },
      take: PAGE_SIZE + 1,
      select: getNotificationSelect(),
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
    });
    const nextCursor =
      notifications.length > PAGE_SIZE ? notifications[PAGE_SIZE].id : null;
    const data: NotificationAPIResponse = {
      message: "Notification Fetched Successfully",
      success: true,
      data: {
        nextCursor,
        data: {
          notifications: notifications.slice(0, PAGE_SIZE),
        },
      },
    };
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("get notifications", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

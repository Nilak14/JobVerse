import { Prisma } from "@prisma/client";

export function getNotificationSelect() {
  return {
    id: true,
    body: true,
    createdAt: true,
    isRead: true,
    link: true,
    title: true,
    category: true,
    imageURL: true,
  } satisfies Prisma.NotificationsSelect;
}
export type NotificationType = Prisma.NotificationsGetPayload<{
  select: ReturnType<typeof getNotificationSelect>;
}>;
export type NotificationAPIResponse = {
  success: boolean;
  message: string;
  data?: {
    nextCursor: string | null;
    data: {
      notifications: NotificationType[];
    };
  };
};

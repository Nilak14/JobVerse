import {
  NotificationAPIResponse,
  NotificationType,
} from "@/lib/prisma-types/Notification";
import { pusherClient } from "@/lib/pusher/client";
import { subscribeNotification } from "@/lib/subscribeNotification";
import { Dispatch, SetStateAction, useEffect } from "react";
import { InfiniteData, QueryKey, useQueryClient } from "react-query";

const useLiveNotification = (
  userId: string,
  setCount: Dispatch<SetStateAction<number>>
) => {
  const queryClient = useQueryClient();
  const cancel = async (queryFilter: QueryKey) => {
    await queryClient.cancelQueries(queryFilter);
  };
  useEffect(() => {
    if (!userId) return;

    const notificationChannel = subscribeNotification(userId);
    notificationChannel.bind(
      "notifications",
      (data: { notification: NotificationType }) => {
        const queryFilter: QueryKey = ["notifications"];
        cancel(queryFilter);
        queryClient.setQueriesData<InfiniteData<NotificationAPIResponse>>(
          queryFilter,
          (oldData) => {
            if (!oldData) {
              return {
                pageParams: [],
                pages: [],
              };
            }
            if (!data) {
              return oldData;
            }
            const existingNotification = oldData.pages.flatMap(
              (page) => page.data?.data.notifications ?? []
            );
            if (
              existingNotification.some((n) => n.id === data.notification.id)
            ) {
              return oldData;
            }
            setCount((count) => count + 1);
            const firstPage = oldData.pages[0];
            if (firstPage) {
              return {
                pageParams: oldData.pageParams,
                pages: [
                  {
                    message: firstPage.message,
                    success: firstPage.success,
                    data: {
                      nextCursor: firstPage.data?.nextCursor ?? null,
                      data: {
                        notifications: [
                          data.notification,
                          ...(firstPage.data?.data.notifications ?? []),
                        ],
                      },
                    },
                  },
                  ...oldData.pages.slice(1),
                ],
              };
            } else {
              return oldData;
            }
          }
        );
      }
    );
    return () => {
      notificationChannel.unbind_all();
      pusherClient.unsubscribe(`n-${userId}`);
      pusherClient.unbind("notifications");
    };
  }, []);
};
export default useLiveNotification;

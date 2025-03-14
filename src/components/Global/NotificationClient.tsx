"use client";
import { Bell } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import NotificationContainer from "./NotificationContainer";
import { Button } from "../ui/button";
import { useState } from "react";
import useLiveNotification from "@/hooks/custom-hooks/use-liveNotification";
import { markAllNotificationsAsRead } from "@/actions/notifications/markAllAsRead";
import { toast } from "sonner";
import { InfiniteData, QueryKey, useQueryClient } from "react-query";
import { NotificationAPIResponse } from "@/lib/prisma-types/Notification";
import { m } from "framer-motion";
import { data } from "framer-motion/client";

interface NotificationClientProps {
  notificationCount: number;
  userId: string;
}
const NotificationClient = ({
  notificationCount,
  userId,
}: NotificationClientProps) => {
  const [count, setCount] = useState(notificationCount);
  useLiveNotification(userId, setCount);
  const queryClient = useQueryClient();
  const markAllAsRead = async () => {
    try {
      const res = await markAllNotificationsAsRead();
      if (res.success) {
        setCount(0);
        const queryFilter: QueryKey = ["notifications"];
        queryClient.setQueriesData<InfiniteData<NotificationAPIResponse>>(
          queryFilter,
          (oldData) => {
            if (!oldData) {
              return {
                pageParams: [],
                pages: [],
              };
            }
            return {
              pageParams: oldData.pageParams,
              pages: oldData.pages.map((page) => {
                return {
                  message: page.message,
                  success: page.success,
                  data: {
                    nextCursor: page.data?.nextCursor ?? null,
                    data: {
                      notifications:
                        page.data?.data.notifications?.map((n) => {
                          return { ...n, isRead: true };
                        }) ?? [],
                    },
                  },
                };
              }),
            };
          }
        );
      } else {
        toast.error("Something went wrong", { id: "markAllAsRead" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "markAllAsRead" });
    }
  };
  return (
    <>
      <PopoverTrigger
        title="Notifications"
        className="relative  h-9 w-9 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2  active:scale-95 transition-transform duration-300 whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      >
        <Bell className=" size-5 text-primary" />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 rounded-full bg-primary text-white px-1 text-xs font-medium tabular-nums">
            {count}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        align="end"
        className="w-[380px] p-0 shadow-xl rounded-xl overflow-hidden "
      >
        <div className="p-4 flex justify-between items-center">
          <h3 className="font-semibold ">Notifications</h3>
          {count > 0 && (
            <Button
              variant="link"
              size="sm"
              className="text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <NotificationContainer
          userId={userId}
          notificationCount={count}
          setNotificationCount={setCount}
        />
      </PopoverContent>
    </>
  );
};
export default NotificationClient;

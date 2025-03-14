"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { NotificationContentType } from "./NotificationContentType";
import { useNotificationInfinityQuery } from "@/hooks/query-hooks/useNotificationInfinityQuery";
import NotificationItemSkeleton from "../skeletons/NotificationItemSkeleton";
import InfiniteScrollContainer from "./InfiniteScrollContainer";

interface NotificationContainerProps {
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  userId: string;
}

const NotificationContainer = ({
  notificationCount,
  setNotificationCount,
  userId,
}: NotificationContainerProps) => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useNotificationInfinityQuery();
  const notifications =
    data?.pages.flatMap((page) => page.data?.data.notifications) ?? [];
  if (status === "loading") {
    return <NotificationItemSkeleton />;
  }
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An Error Occur While Loading the notifications
      </p>
    );
  }

  if (status === "success" && notifications.length === 0 && !hasNextPage) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-full bg-primary/30  p-6 mb-4"
        >
          <Bell className="h-10 w-10 text-orange-400" />
        </motion.div>
        <p className="text-muted-foreground">No notifications yet</p>
      </div>
    );
  }

  return (
    <>
      <InfiniteScrollContainer
        rootMargin="100px"
        className="p-3 max-h-[400px] overflow-y-auto "
        onBottomReached={() => {
          hasNextPage && !isFetching && fetchNextPage();
        }}
      >
        {notifications.map((notification, index) => {
          return (
            <AnimatePresence key={notification?.id}>
              <motion.div
                key={notification?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <NotificationContentType notification={notification!} />
              </motion.div>
            </AnimatePresence>
          );
        })}
        {isFetchingNextPage && <NotificationItemSkeleton length={5} />}
      </InfiniteScrollContainer>
    </>
  );
};
export default NotificationContainer;

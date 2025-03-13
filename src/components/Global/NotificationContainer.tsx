"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import { Bell } from "lucide-react";
import { JobNotification } from "./NotificationContentType";
import { useNotificationInfinityQuery } from "@/hooks/query-hooks/useNotificationInfinityQuery";
import NotificationItemSkeleton from "../skeletons/NotificationItemSkeleton";
import InfiniteScrollContainer from "./InfiniteScrollContainer";

// export const notifications: Notification[] = [
//   {
//     id: "1",
//     title: "New Job Match",
//     message: "A new Senior React Developer position matches your profile.",
//     time: "Just now",
//     read: false,
//     type: "job",
//   },
//   {
//     id: "2",
//     title: "Application Viewed",
//     message: "Google has viewed your application for Frontend Engineer.",
//     time: "15 minutes ago",
//     read: false,
//     type: "application",
//   },
//   {
//     id: "3",
//     title: "Interview Scheduled",
//     message: "Your interview with Apple is confirmed for tomorrow at 2:00 PM.",
//     time: "1 hour ago",
//     read: false,
//     type: "interview",
//   },
//   {
//     id: "4",
//     title: "Application Update",
//     message:
//       "Your application for Product Designer at Meta has moved to the next stage.",
//     time: "2 hours ago",
//     read: false,
//     type: "application",
//   },
//   {
//     id: "5",
//     title: "New Message",
//     message: "You have a new message from the hiring manager at Twitter.",
//     time: "3 hours ago",
//     read: true,
//     type: "message",
//   },
//   {
//     id: "6",
//     title: "Job Recommendation",
//     message:
//       "Based on your skills, you might be interested in UX Designer at Netflix.",
//     time: "5 hours ago",
//     read: true,
//     type: "job",
//   },
//   {
//     id: "7",
//     title: "Interview Reminder",
//     message: "Don't forget your technical interview with Amazon tomorrow.",
//     time: "Yesterday",
//     read: true,
//     type: "interview",
//   },
//   {
//     id: "8",
//     title: "Profile Strength Update",
//     message:
//       "Adding your portfolio could increase your profile visibility by 40%.",
//     time: "Yesterday",
//     read: true,
//     type: "system",
//   },
//   {
//     id: "9",
//     title: "Application Deadline",
//     message: "Remember to complete your application for Microsoft by tomorrow.",
//     time: "2 days ago",
//     read: true,
//     type: "application",
//   },
//   {
//     id: "10",
//     title: "Skills Assessment Available",
//     message:
//       "A new JavaScript skills assessment is available for your profile.",
//     time: "3 days ago",
//     read: true,
//     type: "system",
//   },
// ];

const NotificationContainer = () => {
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
                <JobNotification notification={notification!} />
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

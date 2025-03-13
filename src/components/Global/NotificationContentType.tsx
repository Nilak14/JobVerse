"use client";
import { NotificationType } from "@/lib/prisma-types/Notification";
import { cn, getTimeDistance } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface NotificationProps {
  notification: NotificationType;
}

export const JobNotification = ({ notification }: NotificationProps) => {
  const isRead = true;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "p-4 mb-2 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-primary/10 transition-colors duration-300 ",
        isRead && "bg-primary/5 "
      )}
      //   onClick={() => onRead(notification.id)}
      whileHover={{ x: 4 }}
    >
      <div className="rounded-full bg-primary/30 p-2 shadow-sm">
        <Briefcase className="text-primary" size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold truncate">{notification.title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {getTimeDistance(notification.createdAt)} ago
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.body}
        </p>
      </div>
    </motion.div>
  );
};

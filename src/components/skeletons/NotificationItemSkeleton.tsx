"use client";
import { createArray } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
const NotificationItemSkeleton = ({ length = 4 }: { length?: number }) => {
  return (
    <>
      {createArray(length).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-4 mb-2 rounded-lg flex items-center gap-3 cursor-pointer"
          whileHover={{ x: 4 }}
        >
          <div className="rounded-full  p-2 shadow-sm">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16 ml-2" />
            </div>
            <Skeleton className="h-3 w-full mt-2" />
            <Skeleton className="h-3 w-3/4 mt-2" />
          </div>
        </motion.div>
      ))}
    </>
  );
};
export default NotificationItemSkeleton;

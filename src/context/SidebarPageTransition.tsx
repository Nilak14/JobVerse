"use client";

import { motion } from "framer-motion";

export default function SidebarPageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-1 flex-col gap-4 p-4 pt-0"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 2 }}
    >
      {children}
    </motion.div>
  );
}

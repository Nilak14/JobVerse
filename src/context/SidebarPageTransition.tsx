"use client";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function SidebarPageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

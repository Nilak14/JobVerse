"use client";
import { motion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

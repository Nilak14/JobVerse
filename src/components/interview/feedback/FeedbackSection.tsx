"use client";

import { motion } from "framer-motion";
import { Target, Trophy } from "lucide-react";

interface FeedbackSectionProps {
  title: string;
  items: string[];
  icon: "target" | "trophy";
  className?: string;
}

export function FeedbackSection({
  title,
  items,
  icon,
  className,
}: FeedbackSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className={`rounded-xl border p-6 h-full ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon === "trophy" ? (
          <Trophy className="h-5 w-5 text-primary" />
        ) : (
          <Target className="h-5 w-5 text-primary" />
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {items.map((i, index) => (
          <motion.li
            key={index}
            variants={item}
            className="flex items-start gap-2"
          >
            <span className="text-muted-foreground mt-1">•</span>
            <span>{i}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

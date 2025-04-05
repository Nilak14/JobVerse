"use client";

import { motion } from "framer-motion";

interface CategoryScoreCardProps {
  name: string;
  score: number;
  comment: string;
  index: number;
}

export function CategoryScoreCard({
  name,
  score,
  comment,
  index,
}: CategoryScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const scoreColor = getScoreColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-card rounded-lg border shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center gap-3">
            <div className="w-full sm:w-48 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${scoreColor}`}
              />
            </div>
            <span className="font-medium text-sm w-8">{score}/100</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{comment}</p>
      </div>
    </motion.div>
  );
}

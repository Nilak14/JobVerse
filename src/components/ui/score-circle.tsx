"use client";

import { motion } from "framer-motion";

interface ScoreCircleProps {
  score: number;
}

export function ScoreCircle({ score }: ScoreCircleProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-950/30";
    if (score >= 60) return "bg-yellow-50 dark:bg-yellow-950/30";
    if (score >= 40) return "bg-orange-50 dark:bg-orange-950/30";
    return "bg-red-50 dark:bg-red-950/30";
  };

  const scoreColor = getScoreColor(score);
  const scoreBg = getScoreBackground(score);

  return (
    <div
      className={`relative w-32 h-32 rounded-full ${scoreBg} flex items-center justify-center`}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle for better visibility in dark mode */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/20 dark:text-muted/10"
        />

        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className={scoreColor}
          transform="rotate(-90 50 50)"
          strokeDasharray="283"
          strokeDashoffset="0"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.span
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className={`text-4xl font-bold ${scoreColor}`}
          >
            {score}
          </motion.span>
          <span className="block text-xs text-muted-foreground mt-1">
            Overall Score
          </span>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { MockInterviewFeedbackData } from "@/lib/prisma-types/MockInterview";
import { motion } from "framer-motion";
import FeedbackHeader from "./FeedbackHeader";
import { FeedbackSection } from "./FeedbackSection";
import { CategoryScoreCard } from "./CategoryScoreCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
interface FeedbackProps {
  feedback: MockInterviewFeedbackData;
}
const Feedback = ({ feedback }: FeedbackProps) => {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={item}>
            <FeedbackHeader
              interviewRole={feedback.mockInterview.role!}
              totalScore={feedback.totalScore!}
              finalAssessment={feedback.finalAssessment!}
              createdAt={feedback.createdAt.toString()}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <FeedbackSection
                title="Strengths"
                items={feedback.strengths}
                icon="trophy"
                className="bg-primary/5 border-primary/20"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeedbackSection
                title="Areas for Improvement"
                items={feedback.areaForImprovement}
                icon="target"
                className="bg-primary/5 border-primary/20"
              />
            </motion.div>
          </div>

          <motion.h2 variants={item} className="text-2xl font-bold mt-8 mb-4">
            Detailed Assessment
          </motion.h2>

          <motion.div variants={container} className="grid grid-cols-1 gap-6">
            {feedback.CategoryScore.map((category, index) => (
              <motion.div key={category.name} variants={item}>
                <CategoryScoreCard
                  name={category.name!}
                  score={category.score}
                  comment={category.comment!}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex justify-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="gap-2 px-8 py-6 text-base">
                <Link
                  href={`/job-seeker/take-interview/${feedback.mockInterview.id}`}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Retake Interview
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default Feedback;

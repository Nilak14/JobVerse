import { ScoreCircle } from "@/components/ui/score-circle";
import { motion } from "framer-motion";
interface FeedbackHeaderProps {
  totalScore: number;
  finalAssessment: string;
  createdAt: string;
  interviewRole: string;
}
const FeedbackHeader = ({
  createdAt,
  finalAssessment,
  totalScore,
  interviewRole,
}: FeedbackHeaderProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <ScoreCircle score={totalScore} />
        </motion.div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
            {interviewRole} Interview Feedback
          </h1>
          <p className="text-sm text-muted-foreground mb-4 text-center md:text-left">
            {formattedDate}
          </p>
          <p className="text-muted-foreground">{finalAssessment}</p>
        </div>
      </div>
    </div>
  );
};
export default FeedbackHeader;

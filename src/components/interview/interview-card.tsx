import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import type { MockInterviewData } from "@/lib/prisma-types/MockInterview";
import { formatDistanceToNow } from "date-fns";
import { BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DisplayTechIcons from "../Global/DisplayTechIcons";
import { getInterviewFeedback } from "@/data-access/mock-interview/getInterviewFeedback";
import DeleteInterviewModal from "./DeleteInterviewModal";

interface InterviewCardProps {
  interview: MockInterviewData;
  jobseekerId: string;
}

export async function InterviewCard({
  interview,
  jobseekerId,
}: InterviewCardProps) {
  const { id, level, role, techStack, questions, type, createdAt } = interview;
  const feedback = await getInterviewFeedback({
    interviewId: id,
    userId: jobseekerId,
  });
  const hasFeedback = feedback !== null;

  // Format the date
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  // Get the appropriate badge color based on interview type
  const getBadgeVariant = () => {
    switch (type) {
      case "technical":
        return "default";
      case "behavioral":
        return "secondary";
      case "mixed":
        return "outline";
      default:
        return "default";
    }
  };

  // Get the appropriate level badge color
  const getLevelVariant = () => {
    switch (level?.toLowerCase()) {
      case "junior":
        return "secondary";
      case "mid":
        return "default";
      case "senior":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="h-full">
      <Card className="overflow-hidden h-full border-primary/10 hover:border-primary/30 transition-all hover:shadow-md flex flex-col">
        <CardHeader className="pb-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge
                variant={getLevelVariant()}
                className="capitalize font-medium"
              >
                {level}
              </Badge>
              <Badge
                variant={getBadgeVariant()}
                className="capitalize font-medium"
              >
                {type}
              </Badge>
            </div>
            <DeleteInterviewModal interviewId={id} />
          </div>
          <h3 className="text-lg font-semibold mt-2 line-clamp-2 capitalize">
            {role}
          </h3>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="space-y-3">
            <DisplayTechIcons techStack={techStack} />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 flex-shrink-0" />
              <span
                className={cn(
                  "font-medium",
                  questions.length > 10 ? "text-primary" : ""
                )}
              >
                {questions.length} questions
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>

            {/* Feedback section */}
            <div className="mt-4 border-t pt-3 border-border">
              {hasFeedback ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">
                    Feedback <span>({feedback.totalScore}%)</span>
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {feedback.finalAssessment}
                  </p>
                </div>
              ) : (
                <div className="py-4 flex items-center justify-center">
                  <p className="text-sm text-center text-muted-foreground">
                    You haven&apos;t taken this interview yet.
                    <br />
                    Take the interview to get feedback.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex flex-wrap gap-2">
          {hasFeedback ? (
            <>
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`/job-seeker/take-interview/${id}/feedback`}>
                  View Feedback
                </Link>
              </Button>
              <Button asChild variant="default" size="sm" className="flex-1">
                <Link href={`/job-seeker/take-interview/${id}`}>
                  Retake Interview
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="default" size="sm" className="w-full">
              <Link href={`/job-seeker/take-interview/${id}`}>
                Take Interview
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

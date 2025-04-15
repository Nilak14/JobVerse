import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import {
  CalendarDays,
  Video,
  Phone,
  Users,
  AlertCircle,
  Clock,
} from "lucide-react";
import { format, isToday, isTomorrow, compareAsc } from "date-fns";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/Global/Useravatar";
import { getCompanyScheduledInterview } from "@/data-access/admin-access/analytics/getAnalyticsData";

interface ScheduledInterviewProps {
  companyId: string;
}

type CompanyInterview = {
  jobSeeker: {
    user: {
      name: string | null;
      email: string;
      image: string | null;
    };
  };
  Interview: {
    interviewDate: Date;
    interviewTime: string;
    interviewType: "VOICE_CALL" | "VIDEO_CALL" | "FACE_TO_FACE";
    note: string | null;
  } | null;
};

const ScheduledInterview = ({ companyId }: ScheduledInterviewProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Suspense fallback={<CardTitle>Scheduled Interviews</CardTitle>}>
          <InterviewCountTitle companyId={companyId} />
        </Suspense>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<ScheduleInterviewSkeleton />}>
          <ScheduledInterviewDataFetcher companyId={companyId} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ScheduledInterview;

const InterviewCountTitle = async ({ companyId }: { companyId: string }) => {
  try {
    const interviews = await getCompanyScheduledInterview(companyId);
    const count = interviews?.length || 0;

    return (
      <>
        <CardTitle>Scheduled Interviews</CardTitle>
        <CardDescription>
          {count} Upcoming {count === 1 ? "Interview" : "Interviews"}
        </CardDescription>
      </>
    );
  } catch (error) {
    return (
      <>
        <CardTitle>Scheduled Interviews</CardTitle>
        <CardDescription>Upcoming Interviews</CardDescription>
      </>
    );
  }
};

const ScheduleInterviewSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            key={index}
          >
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse shrink-0"></div>
            <div className="space-y-2 flex-1 w-full">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <AlertCircle className="h-8 w-8 text-destructive mb-2" />
      <h3 className="font-medium">Failed to load data</h3>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
  );
};

const getInterviewTypeIcon = (type: string) => {
  switch (type) {
    case "VIDEO_CALL":
      return <Video className="h-3 w-3" />;
    case "VOICE_CALL":
      return <Phone className="h-3 w-3" />;
    case "FACE_TO_FACE":
      return <Users className="h-3 w-3" />;
    default:
      return <Users className="h-3 w-3" />;
  }
};

const getInterviewTypeLabel = (type: string) => {
  switch (type) {
    case "VIDEO_CALL":
      return "Video Call";
    case "VOICE_CALL":
      return "Voice Call";
    case "FACE_TO_FACE":
      return "Face to Face";
    default:
      return "Interview";
  }
};

const getInterviewVariant = (type: string) => {
  switch (type) {
    case "VIDEO_CALL":
      return "default";
    case "VOICE_CALL":
      return "secondary";
    case "FACE_TO_FACE":
      return "outline";
    default:
      return "default";
  }
};

const formatDateLabel = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else {
    return format(date, "MMM d, yyyy");
  }
};

const ScheduledInterviewDataFetcher = async ({
  companyId,
}: {
  companyId: string;
}) => {
  try {
    const interviews = await getCompanyScheduledInterview(companyId);

    if (!interviews || interviews.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CalendarDays className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            No scheduled interviews found
          </p>
        </div>
      );
    }

    // Sort interviews by date (nearest first)
    const sortedInterviews = [...interviews].sort((a, b) => {
      if (!a.Interview || !b.Interview) return 0;
      return compareAsc(
        new Date(a.Interview.interviewDate),
        new Date(b.Interview.interviewDate)
      );
    });

    const maxHeight = interviews.length > 5 ? "h-80 overflow-y-auto pr-2" : "";

    return (
      <div className={`space-y-4 ${maxHeight}`}>
        {sortedInterviews.map((interview: CompanyInterview, index: number) => (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
            key={index}
          >
            <UserAvatar
              imageUrl={interview.jobSeeker.user.image || ""}
              userName={interview.jobSeeker.user.name || ""}
            />

            <div className="flex flex-col space-y-1 flex-1 min-w-0 w-full sm:w-auto">
              <h3 className="text-sm font-medium truncate">
                {interview.jobSeeker.user.name || "Unnamed Candidate"}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {interview.jobSeeker.user.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              {interview.Interview && (
                <>
                  <Badge
                    variant={getInterviewVariant(
                      interview.Interview.interviewType
                    )}
                    className="flex items-center gap-1 h-6"
                  >
                    {getInterviewTypeIcon(interview.Interview.interviewType)}
                    {getInterviewTypeLabel(interview.Interview.interviewType)}
                  </Badge>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md h-6">
                    <CalendarDays className="h-3 w-3" />
                    {formatDateLabel(
                      new Date(interview.Interview.interviewDate)
                    )}{" "}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md h-6">
                    <Clock className="h-3 w-3" />
                    {interview.Interview.interviewTime}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch scheduled interviews:", error);
    return (
      <ErrorDisplay message="There was an error loading the scheduled interviews data" />
    );
  }
};

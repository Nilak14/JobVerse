import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { CalendarDays, Briefcase, AlertCircle, ArrowRight } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/Global/Useravatar";
import { getRecentPendingApplication } from "@/data-access/admin-access/analytics/getAnalyticsData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecentPendingApplicantProps {
  companyId: string;
}

type PendingApplication = {
  createdAt: Date;
  job: {
    id: string;
    title: string | null;
  };
  jobSeeker: {
    user: {
      name: string | null;
      email: string;
      image: string | null;
    };
  };
};

const RecentPendingApplicant = ({ companyId }: RecentPendingApplicantProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Suspense fallback={<CardTitle>Recent Pending Applications</CardTitle>}>
          <ApplicationCountTitle companyId={companyId} />
        </Suspense>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<ApplicationSkeleton />}>
          <RecentPendingApplicationDataFetcher companyId={companyId} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default RecentPendingApplicant;

const ApplicationCountTitle = async ({ companyId }: { companyId: string }) => {
  try {
    const applications = await getRecentPendingApplication(companyId);
    const count = applications?.length || 0;

    return (
      <>
        <CardTitle>Recent Pending Applications</CardTitle>
        <CardDescription>
          {count} Pending {count === 1 ? "Application" : "Applications"}
        </CardDescription>
      </>
    );
  } catch (error) {
    return (
      <>
        <CardTitle>Recent Pending Applications</CardTitle>
        <CardDescription>Pending Applications</CardDescription>
      </>
    );
  }
};

const ApplicationSkeleton = () => {
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
              <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
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

const formatDateLabel = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else {
    return format(date, "MMM d, yyyy");
  }
};

const RecentPendingApplicationDataFetcher = async ({
  companyId,
}: {
  companyId: string;
}) => {
  try {
    const recentApplications = await getRecentPendingApplication(companyId);

    if (!recentApplications || recentApplications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Briefcase className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            No pending applications found
          </p>
        </div>
      );
    }

    const maxHeight =
      recentApplications.length > 5 ? "h-80 overflow-y-auto pr-2" : "";

    return (
      <div className={`space-y-4 ${maxHeight}`}>
        {recentApplications.map(
          (application: PendingApplication, index: number) => (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
              key={index}
            >
              <UserAvatar
                imageUrl={application.jobSeeker.user.image || ""}
                userName={application.jobSeeker.user.name || ""}
              />

              <div className="flex flex-col space-y-1 flex-1 min-w-0 w-full sm:w-auto">
                <h3 className="text-sm font-medium truncate">
                  {application.jobSeeker.user.name || "Unnamed Applicant"}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {application.jobSeeker.user.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 items-center w-full sm:w-auto">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 h-6"
                >
                  <Briefcase className="h-3 w-3" />
                  {application.job.title || "Untitled Job"}
                </Badge>

                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md h-6">
                  <CalendarDays className="h-3 w-3" />
                  {formatDateLabel(new Date(application.createdAt))}
                </div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/employer/applicants?jobId=${application.job.id}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 ml-1"
                          aria-label="View all applicants"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      View Other Applicant for this job
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch recent pending applications:", error);
    return (
      <ErrorDisplay message="There was an error loading the pending applications data" />
    );
  }
};

"use client";
import { useQueryJobSeekerCardAnalytics } from "@/hooks/query-hooks/getOverviewCardAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { CheckCircle, FileUser, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import LinkButtonAnimated from "@/components/ui/animated-button-link";
import Link from "next/link";

const TopCard = () => {
  const { data, isLoading } = useQueryJobSeekerCardAnalytics();
  const analytics = data?.data;

  return (
    <div className="mt-5 flex flex-col">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Job Applied Card */}
        <Card className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Job Applied
            </CardTitle>
            <FileUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-grow flex items-center">
            <div className="text-2xl font-bold ">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {analytics?.totalApplication ? (
                    <NumberTicker value={analytics.totalApplication} />
                  ) : (
                    0
                  )}
                  <LinkButtonAnimated>
                    <Link href={"/job-seeker/applied-jobs"} className="text-sm">
                      View Applied Jobs
                    </Link>
                  </LinkButtonAnimated>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Saved Card */}
        <Card className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Saved</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-grow flex items-center">
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {analytics?.jobSaved ? (
                    <NumberTicker value={analytics.jobSaved} />
                  ) : (
                    0
                  )}
                  <LinkButtonAnimated>
                    <Link href={"/job-seeker/saved-jobs"} className="text-sm">
                      View Saved Jobs
                    </Link>
                  </LinkButtonAnimated>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion Card */}
        <Card className="col-span-1 md:col-span-2 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading ? (
              <Skeleton className="w-full h-[35px]" />
            ) : (
              <div className="flex flex-col h-full justify-center">
                <div className="flex items-baseline mb-2">
                  <div className="text-2xl font-bold mr-2">
                    {analytics?.profileCompletion?.percentage || 0}%
                  </div>
                  <span className="text-xs text-muted-foreground">
                    completed
                  </span>
                </div>
                <Progress
                  value={analytics?.profileCompletion?.percentage || 0}
                  className="h-2 mb-2"
                />
                <span className="text-xs text-muted-foreground tracking-wide font-normal">
                  Complete profile to enhance hiring chances
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TopCard;

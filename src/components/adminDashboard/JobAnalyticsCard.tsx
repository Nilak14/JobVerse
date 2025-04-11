"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Activity, Briefcase, UserCheck } from "lucide-react";
import { useQueryJobCardAnalytics } from "@/hooks/query-hooks/getOverviewCardAnalytics";
import { Skeleton } from "../ui/skeleton";
const JobAnalyticsCard = () => {
  const { data, isLoading } = useQueryJobCardAnalytics();
  const analytics = data?.data;
  return (
    <div className="mt-5  flex flex-col ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {analytics.totalJobs ? (
                    <NumberTicker value={analytics.totalJobs} />
                  ) : (
                    0
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {analytics.activeJobs ? (
                    <NumberTicker value={analytics.activeJobs} />
                  ) : (
                    0
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {" "}
                  {analytics.totalApplications ? (
                    <NumberTicker value={analytics.totalApplications} />
                  ) : (
                    0
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default JobAnalyticsCard;

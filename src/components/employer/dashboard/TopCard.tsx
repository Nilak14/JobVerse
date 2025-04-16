"use client";
import { useQueryEmployerCardAnalytics } from "@/hooks/query-hooks/getOverviewCardAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Briefcase, Hourglass, SquarePlus, Users } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
interface TopCardProps {
  companyId: string;
}
const TopCard = ({ companyId }: TopCardProps) => {
  const { data, isLoading } = useQueryEmployerCardAnalytics(companyId);
  const analytics = data?.data;

  return (
    <div className="mt-5  flex flex-col ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Jobs Created
            </CardTitle>
            <SquarePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {analytics.jobCreated ? (
                    <NumberTicker value={analytics.jobCreated} />
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
              Active Jobs Now
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
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
              Total Applicants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {analytics.totalApplicants ? (
                    <NumberTicker value={analytics.totalApplicants} />
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
              Pending Applicants
            </CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="w-[35px] h-[35px]" />
                ) : (
                  <>
                    {analytics.pendingApplicants ? (
                      <NumberTicker value={analytics.pendingApplicants} />
                    ) : (
                      0
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default TopCard;

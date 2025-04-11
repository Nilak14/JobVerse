"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Briefcase, CreditCard, DollarSign, Users } from "lucide-react";
import { useQueryCardAnalytics } from "@/hooks/query-hooks/getOverviewCardAnalytics";
import { Skeleton } from "../ui/skeleton";
const OverviewCard = () => {
  // const [filterDate, setFilterDate] = useState<DateRangeValue>({
  //   dateOption: "thisMonth",
  //   range: {
  //     from: startOfMonth(new Date()),
  //     to: endOfMonth(new Date()),
  //   },
  // });
  const { data, isLoading } = useQueryCardAnalytics();
  const analytics = data?.data;
  return (
    <div className="mt-5  flex flex-col ">
      <div className="self-end">
        {/* <DateFilters
          value={filterDate}
          onValueChange={(e) => {
            setFilterDate(e);
            console.log(e);
          }}
        /> */}
      </div>
      {/* <p className="text-xs text-muted-foreground mb-3">
        Showing Data From {formatDateRange(filterDate)}{" "}
      </p> */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {analytics.newUsers ? (
                    <NumberTicker value={analytics.newUsers} />
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="w-[35px] h-[35px]" />
              ) : (
                <>
                  {" "}
                  $
                  {analytics.totalRevenue ? (
                    <NumberTicker value={analytics.totalRevenue} />
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
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="w-[35px] h-[35px]" />
                ) : (
                  <>
                    {analytics.activeSubscriptions ? (
                      <NumberTicker value={analytics.activeSubscriptions} />
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
export default OverviewCard;

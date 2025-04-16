"use client";
import { AlertCircle } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { YearPicker } from "@/components/ui/year-picker";
import { useQueryEmployerApplicantTrend } from "@/hooks/query-hooks/getChartData";

const chartConfig = {
  totalApplicant: {
    label: "Applicant",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const placeholderData = Array(12)
  .fill(1)
  .map((_, i) => ({
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][i],
    totalApplicant: 0,
  }));

interface ApplicationTrendsProps {
  companyId: string;
}
const ApplicationTrends = ({ companyId }: ApplicationTrendsProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const { data, isLoading, error } = useQueryEmployerApplicantTrend(
    selectedYear.toString(),
    companyId
  );

  const chartData = data?.data || placeholderData;

  const renderChart = () => {
    return (
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickCount={3} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />

          <Area
            dataKey="totalApplicant"
            type="monotone"
            fill="hsl(var(--chart-3))"
            fillOpacity={isLoading ? 0.1 : 0.4}
            stroke="hsl(var(--chart-3))"
            strokeOpacity={isLoading ? 0.3 : 1}
            stackId="a"
          />
          {!isLoading && <ChartLegend content={<ChartLegendContent />} />}
        </AreaChart>
      </ChartContainer>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="relative">
          {renderChart()}
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span className="text-sm text-muted-foreground">
                Loading Data...
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (error || !data?.data) {
      return (
        <div className="relative">
          {renderChart()}
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <span className="font-medium">Failed to load chart data</span>
              <p className="text-sm text-muted-foreground">
                There was an error loading the registration data. Please try
                again later.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return renderChart();
  };

  return (
    <Card className="col-span-4 ">
      <CardHeader className="flex justify-between items-center flex-row">
        <div>
          <CardTitle>Applicant Trends</CardTitle>
          <CardDescription className="mt-1 ">
            All Applicants for {selectedYear}
          </CardDescription>
        </div>
        <div>
          <YearPicker defaultYear={selectedYear} onChange={setSelectedYear} />
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default ApplicationTrends;

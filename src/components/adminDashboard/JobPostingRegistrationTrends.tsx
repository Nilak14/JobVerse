"use client";
import { AlertCircle } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { YearPicker } from "../ui/year-picker";
import { useState } from "react";
import { useQueryJobPostTrend } from "@/hooks/query-hooks/getChartData";

const chartConfig = {
  jobPosted: {
    label: "Job Created",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

// Placeholder data for the loading state to maintain chart dimensions
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
    jobPosted: 0,
  }));

const JobPostingTrends = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const { data, isLoading, error } = useQueryJobPostTrend(
    selectedYear.toString()
  );

  const chartData = data?.data || placeholderData;

  const renderChart = () => {
    return (
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
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
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="jobPosted"
            type="monotone"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            dot={{
              fill: "hsl(var(--chart-3))",
            }}
            activeDot={{
              r: 6,
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
        </LineChart>
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
                There was an error loading the job created data. Please try
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
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
        <div>
          <CardTitle>Job Creation Trends</CardTitle>
          <CardDescription className="mt-1">
            Job Creation Trend for {selectedYear}
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

export default JobPostingTrends;

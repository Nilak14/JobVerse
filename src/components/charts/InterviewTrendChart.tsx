"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

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

interface InterviewTrendChartProps {
  data: {
    name: string | null;
    score: number;
  }[];
}

const chartConfig = {
  name: {
    label: "Role",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const InterviewTrendChart = ({ data }: InterviewTrendChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>Interview performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px] w-full" config={chartConfig}>
          <LineChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="score"
              type="linear"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InterviewTrendChart;

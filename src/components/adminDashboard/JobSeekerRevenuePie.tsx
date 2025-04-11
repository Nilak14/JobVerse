"use client";
import { Label, LabelList, Pie, PieChart } from "recharts";
import { AlertCircle } from "lucide-react";
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
import {
  useQueryJobSeekerRevenuePieData,
  useQueryUserDistribution,
} from "@/hooks/query-hooks/getChartData";

const chartConfig = {
  PRO: {
    label: "PRO",
    color: "hsl(var(--chart-1))",
  },
  FREE: {
    label: "FREE",
    color: "hsl(var(--chart-2))",
  },
  ELITE: {
    label: "ELITE",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const JobSeekerRevenuePie = () => {
  const { data, isLoading, error } = useQueryJobSeekerRevenuePieData();

  const chartData = data?.data;

  const renderPieChart = () => {
    return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            labelLine={false}
            label={({ payload, ...props }) => {
              return (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                  fillOpacity={isLoading ? 0.3 : 1}
                >
                  {isLoading ? "" : payload.total <= 0 ? "" : payload.total}
                </text>
              );
            }}
            data={chartData}
            dataKey="total"
            nameKey="type"
            opacity={isLoading ? 0.3 : 1}
          ></Pie>
          {!isLoading && (
            <ChartLegend content={<ChartLegendContent nameKey="type" />} />
          )}
        </PieChart>
      </ChartContainer>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="relative">
          {renderPieChart()}
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span className="text-sm text-muted-foreground">
                Loading User Distribution...
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (error || !data?.data) {
      return (
        <div className="relative">
          {renderPieChart()}
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <span className="font-medium">Failed to load data</span>
              <p className="text-sm text-muted-foreground">
                There was an error loading the user distribution data.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return renderPieChart();
  };

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Job Seeker Users</CardTitle>
        <CardDescription>
          Breakdown of job seekers premium users
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-64">{renderContent()}</CardContent>
    </Card>
  );
};

export default JobSeekerRevenuePie;

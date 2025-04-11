"use client";
import { Label, Pie, PieChart } from "recharts";
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
import { useQueryUserDistribution } from "@/hooks/query-hooks/getChartData";

const chartConfig = {
  total: {
    label: "Total",
  },
  JOB_SEEKER: {
    label: "JOB_SEEKER",
    color: "hsl(var(--chart-1))",
  },
  EMPLOYER: {
    label: "EMPLOYER",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Placeholder data for loading state
const placeholderChartData = [
  { type: "EMPLOYER", total: 0, fill: "hsl(var(--chart-1))" },
  { type: "JOB_SEEKER", total: 0, fill: "hsl(var(--chart-3))" },
];

const UserDistributionPie = () => {
  const { data, isLoading, error } = useQueryUserDistribution();

  // Setup data variables with fallbacks
  const totalUser = data?.data?.totalUsers || 0;
  const jobSeekerCount = data?.data?.jobSeekerCount || 0;
  const employerCount = data?.data?.employerCount || 0;

  const chartData = data?.data
    ? [
        { type: "EMPLOYER", total: employerCount, fill: "hsl(var(--chart-1))" },
        {
          type: "JOB_SEEKER",
          total: jobSeekerCount,
          fill: "hsl(var(--chart-3))",
        },
      ]
    : placeholderChartData;

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
                  {isLoading ? "" : payload.total}
                </text>
              );
            }}
            data={chartData}
            dataKey="total"
            nameKey="type"
            innerRadius={60}
            opacity={isLoading ? 0.3 : 1}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                        fillOpacity={isLoading ? 0.3 : 1}
                      >
                        {isLoading ? "—" : totalUser.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                        fillOpacity={isLoading ? 0.3 : 1}
                      >
                        Total User
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
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
    <Card className="col-span-3">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Distribution</CardTitle>
        <CardDescription>Breakdown of user types</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-64">{renderContent()}</CardContent>
    </Card>
  );
};

export default UserDistributionPie;

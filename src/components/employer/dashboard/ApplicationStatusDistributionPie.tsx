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
import { useQueryEmployerApplicationDistribution } from "@/hooks/query-hooks/getChartData";

const chartConfig = {
  totalApplications: {
    label: "Total",
  },
  acceptedCount: {
    label: "Accepted",
    color: "hsl(var(--chart-1))",
  },
  rejectedCount: {
    label: "Rejected",
    color: "red",
  },
  pendingCount: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
  interviewCount: {
    label: "Interview",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

// Placeholder data for loading state
const placeholderChartData = [
  {
    type: "Accepted Applicant",
    total: 0,
    fill: "hsl(var(--chart-1))",
  },
  {
    type: "Rejected Applicant",
    total: 0,
    fill: "red",
  },
  {
    type: "Pending Applicant",
    total: 0,
    fill: "hsl(var(--chart-2))",
  },
  {
    type: "Interview Applicant",
    total: 0,
    fill: "hsl(var(--chart-4))",
  },
];
interface ApplicationStatusPieProps {
  companyId: string;
}
const ApplicationStatusDistributionPie = ({
  companyId,
}: ApplicationStatusPieProps) => {
  const { data, isLoading, error } =
    useQueryEmployerApplicationDistribution(companyId);

  // Setup data variables with fallbacks
  const totalApplications = data?.data?.totalApplications || 0;
  const acceptedCount = data?.data?.acceptedCount || 0;
  const rejectedCount = data?.data?.rejectedCount || 0;
  const pendingCount = data?.data?.pendingCount || 0;
  const interviewCount = data?.data?.interviewCount || 0;

  const chartData = data?.data
    ? [
        {
          type: "acceptedCount",
          total: acceptedCount,
          fill: "hsl(var(--chart-1))",
        },
        {
          type: "rejectedCount",
          total: rejectedCount,
          fill: "red",
        },
        {
          type: "pendingCount",
          total: pendingCount,
          fill: "hsl(var(--chart-2))",
        },
        {
          type: "interviewCount",
          total: interviewCount,
          fill: "hsl(var(--chart-4))",
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
                        {isLoading ? "—" : totalApplications.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                        fillOpacity={isLoading ? 0.3 : 1}
                      >
                        Total Application
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
          {renderPieChart()}
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <span className="font-medium">Failed to load data</span>
              <p className="text-sm text-muted-foreground">
                There was an error loading the data.
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
        <CardTitle>Application Status Distribution</CardTitle>
        <CardDescription>Breakdown of application status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-64">{renderContent()}</CardContent>
    </Card>
  );
};

export default ApplicationStatusDistributionPie;

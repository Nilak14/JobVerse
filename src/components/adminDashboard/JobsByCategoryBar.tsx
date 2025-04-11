"use client";
import { AlertCircle, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { YearPicker } from "../ui/year-picker";
import { useQueryJobsByCategory } from "@/hooks/query-hooks/getChartData";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  "Writing & Translation": {
    label: "Writing & Translation",
    color: "hsl(var(--chart-1))",
  },
  "Human Resources": {
    label: "Human Resources",
    color: "hsl(var(--chart-2))",
  },
  "Human Manufacturing & Logistics": {
    label: "Manufacturing & Logistics",
    color: "hsl(var(--chart-2))",
  },
  "Marketing & Sales": {
    label: "Marketing & Sales",
    color: "hsl(var(--chart-2))",
  },
  "Healthcare & Medical": {
    label: "Healthcare & Medical",
    color: "hsl(var(--chart-2))",
  },
  "Education & Training": {
    label: "Education & Training",
    color: "hsl(var(--chart-2))",
  },
  "Finance & Accounting": {
    label: "Finance & Accounting",
    color: "hsl(var(--chart-2))",
  },
  "Software & IT": {
    label: "Software & IT",
    color: "hsl(var(--chart-2))",
  },
  "Customer Support": {
    label: "Customer Support",
    color: "hsl(var(--chart-2))",
  },
  "Design & Creative": {
    label: "Design & Creative",
    color: "hsl(var(--chart-2))",
  },
  "Legal & Compliance": {
    label: "Legal & Compliance",
    color: "hsl(var(--chart-2))",
  },
  Engineering: {
    label: "Engineering",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const JobsByCategoryBar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const { data, isLoading, error } = useQueryJobsByCategory(
    selectedYear.toString()
  );

  const chartData = data?.data;

  const renderChart = () => {
    return (
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="total"
            fill="hsl(var(--chart-3))"
            strokeWidth={2}
            radius={8}
          ></Bar>
        </BarChart>
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
    <Card className=" ">
      <CardHeader className="flex justify-between items-center flex-row">
        <div>
          <CardTitle>Jobs Posted By Category</CardTitle>
          <CardDescription>
            New user registrations for {selectedYear}
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

export default JobsByCategoryBar;

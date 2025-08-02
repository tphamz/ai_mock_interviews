"use client";
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
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

type Props = {
  data: { name: string; score: number }[];
};

const chartConfig = {
  averageScore: {
    label: "Average Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function CategoryScoreChart({ data }: Props) {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>Average Scores By Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="score" fill="var(--color-averageScore)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="h-[150px] w-full flex row-flex justify-center items-center text-lg text-muted-foreground">
            No data
          </div>
        )}
      </CardContent>
    </Card>
  );
}

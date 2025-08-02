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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

type Props = {
  data: { name: string; score: number }[];
  types: string[];
};

export default function TypeScoreChart({ data, types }: Props) {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>Average Scores By Types</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <ChartContainer
            config={types.reduce(
              (res, item, index) => ({
                ...res,
                [item]: { label: item, color: `var(--chart-${index + 1})` },
              }),
              {}
            )}
            className="max-h-[350px] w-full"
          >
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
              {types.map((item, index) => (
                <Bar
                  dataKey={item}
                  fill={`var(--color-${item})`}
                  radius={4}
                  key={index}
                />
              ))}
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

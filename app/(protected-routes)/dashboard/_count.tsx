"use client";
import animations from "@/components/resuable/animations";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  title?: string | ReactNode;
  value: number;
  description?: string | ReactNode;
};
export default function Count({ title = "", value, description }: Props) {
  return (
    <Card className="w-full border-none">
      <CardContent className="flex flex-col justify-center items-center min-h-[100px] gap-2">
        <CardDescription>{title}</CardDescription>

        <CardTitle>
          <animations.Counter to={value} className="text-4xl" />
        </CardTitle>

        <CardContent>{description}</CardContent>
      </CardContent>
    </Card>
  );
}

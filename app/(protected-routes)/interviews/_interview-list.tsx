"use client";
import animations from "@/components/resuable/animations";
import InterviewCard from "@/components/resuable/cards/interview-card";
import EmptyList from "@/components/resuable/empty-list";
import { Button } from "@/components/ui/button";
import { Interview } from "@prisma/client";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  data?: Interview[];
};
export default function InterviewList({ data = [] }: Props) {
  if (!data.length)
    return (
      <EmptyList>
        <animations.Scramble className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <span className="text-4xl">“</span>
            <span className="text-xl">
              Practice makes confident. Let's begin!
            </span>
            <span className="text-4xl">”</span>
          </div>
        </animations.Scramble>
        <animations.ScaleBounce options={{ delay: 1 }}>
          <Button
            className="cursor-pointer mt-5 text-xl rounded-2xl px-10 border-stone-50 hover:!border-primary hover:text-primary"
            variant="outline"
            onClick={() => redirect("/interviews/create")}
          >
            Create an Interview
          </Button>
        </animations.ScaleBounce>
      </EmptyList>
    );

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="w-full flex flex-row justify-end">
        <animations.ScaleBounce>
          <Button
            onClick={() => redirect("/interviews/create")}
            className="cursor-pointer"
          >
            <Plus />
            <span>Create an Interview</span>
          </Button>
        </animations.ScaleBounce>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full gap-4">
        {data.map((item: any, index: number) => (
          <InterviewCard
            key={item.id}
            {...item}
            onAction={(id) => redirect(`/interviews/${id}/start`)}
            className="w-full h-[250px] border-muted"
          />
        ))}
      </div>
    </div>
  );
}

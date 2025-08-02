"use client";
import animations from "@/components/resuable/animations";
import FeedbackCard, {
  FeedbackProps,
} from "@/components/resuable/cards/feedback-card";
import EmptyList from "@/components/resuable/empty-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Feedback } from "@prisma/client";

import { redirect } from "next/navigation";
import { useMemo, useState } from "react";

type Props = {
  data?: Feedback[];
};
export default function FeedbackList({ data = [] }: Props) {
  const [dialogDetail, setDialogDetail] = useState<FeedbackProps | null>(null);
  const feedbacks = useMemo(
    () =>
      data.map((item: any) => ({
        ...item,
        interview: item.Interview,
      })),
    [data]
  );
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
            onClick={() => redirect("/interviews")}
          >
            Start an Interview
          </Button>
        </animations.ScaleBounce>
      </EmptyList>
    );

  return (
    <>
      <div className="w-full h-full flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full gap-4">
          {feedbacks.map((item: FeedbackProps, index: number) => (
            <FeedbackCard
              onAction={(id) =>
                setDialogDetail(feedbacks.find((item) => item.id === id))
              }
              key={index}
              {...item}
              className="border-muted w-full"
            />
          ))}
          <div className="flex-auto" />
        </div>
      </div>
      {Boolean(dialogDetail) && (
        <Dialog
          open={Boolean(dialogDetail)}
          onOpenChange={() => setDialogDetail(null)}
        >
          <DialogContent className="min-w-[80%] !h-[90vh]">
            <DialogHeader>
              <DialogTitle>Feedback Detail</DialogTitle>
            </DialogHeader>
            <div className="overflow-auto">
              <DialogDescription className="w-full h-full overflow-auto box-border">
                <pre className="wrap-break-word box-border overflow-auto h-full w-full ">
                  {JSON.stringify(dialogDetail, null, "\t")}
                </pre>
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

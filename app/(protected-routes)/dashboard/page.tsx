"use client";
import AnimatedContent from "@/components/animations/AnimatedContent/AnimatedContent";
import CallProfile from "@/components/resuable/call-profile/call-profile";
import InterviewCard from "@/components/resuable/cards/interview-card";
import FeedbackCard from "@/components/resuable/cards/feedback-card";
import interviews from "@/constants/interviews.json";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

const sampelInterviewProgress = [
  {
    title: "Frontend Developer",
    status: "complete",
    rating: 4,
    duration: "45 minutes",
    aiAgent: "Alex Chen - Google",
  },
  {
    title: "Behavioral Interview",
    status: "in-progress",
    rating: 5,
    duration: "32 minutes",
    aiAgent: "Maria Rodriguez - Meta",
  },
  {
    title: "JavaScript Technical",
    status: "complete",
    rating: 3,
    duration: "60 minutes",
    aiAgent: "David Kim - Netflix",
  },
];

let interval: any;
export default function Dashboard() {
  const router = useRouter();
  const onAction = () => {
    console.log("onAction");
  };

  return (
    <div className="flex flex-col gap-15 relative">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Your Results</h1>
        <div className="flex flex-row items-center w-full h-full flex-wrap gap-4">
          {sampelInterviewProgress.map((item: any, index: number) => (
            <AnimatedContent
              key={index}
              distance={10}
              direction="vertical"
              reverse={false}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              delay={0.3}
            >
              <FeedbackCard
                {...item}
                onAction={onAction}
                className="w-[450px] h-[200px] border-muted"
              />
            </AnimatedContent>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Available Interviews</h1>
        <div className="flex flex-row items-center w-full h-full flex-wrap gap-4">
          {interviews.map((item: any, index: number) => (
            <AnimatedContent
              key={index}
              distance={10}
              direction="vertical"
              reverse={false}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              delay={0.3}
            >
              <InterviewCard
                {...item}
                onAction={onAction}
                className="w-[450px] h-[250px] border-muted"
              />
            </AnimatedContent>
          ))}
        </div>
      </div>
      <Button onClick={() => router.push("/interviews/create")}>
        Create an Interview
      </Button>
    </div>
  );
}

"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardContents = [
  {
    icon: "📋",
    title: "Realistic Mock Interviews",
    description:
      "Simulates real interviews with role-specific questions and timed responses.",
  },
  {
    icon: " 📊",
    title: "Feedback and Analytics",
    description:
      "Instant insights on strengths, weaknesses, and overall performance.",
  },
  // {
  //   icon: "🎯",
  //   title: "Customized Questions",
  //   description:
  //     "Practice for specific jobs, companies, or industries.",
  // },
  {
    icon: "🏆",
    title: " Track Your Progress",
    description: "See your improvement with reports and trends over time.",
  },
];

export default function Section3() {
  const section = useRef(null);

  useGSAP(async () => {
    gsap.from(section.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: section.current,
        start: "top 70%",
        toggleActions: "play reverse play reverse",
      },
    });
  });
  return (
    <div
      ref={section}
      className="w-full min-h-[100%] relative flex flex-row items-center gap-5 md:flex-row p-10 lg:px-50 lg:py-20 box-border"
    >
      <div className="z-1 w-full h-full flex flex-col justify-center items-start gap-5">
        <Button
          className="rounded-full p-5 bg-transparent border-stone-300 hover:bg-transparent text-xl tracking-wide"
          variant="outline"
        >
          Why use AI Mock Interviews?
        </Button>
        <div className="text-2xl md:text-3xl text-black flex flex-col w-full gap-5 tracking-wider my-10 max-w-[800px]">
          Get ready to impress in your next interview with AI-powered practice.
          Here’s how our platform helps you prepare effectively:
        </div>
        <div className="flex flex-col items-start gap-5 flew-wrap md:flex-row">
          {cardContents.map((content, index) => (
            <Card
              key={index}
              className="p-10 flex-1 min-h-[280px] border-none shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-5xl">{content.icon}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl tracking-wide mb-2">{content.title}</h3>
                <CardDescription className="text-lg text-muted-foreground">
                  {content.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <img
        className="w-full h-full p-0 object-cover absolute top-0 left-0"
        src="section3.jpg"
      />
    </div>
  );
}

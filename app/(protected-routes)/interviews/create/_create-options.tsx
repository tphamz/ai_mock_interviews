"use client";
import NeonCard from "@/components/resuable/neon-card";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

type Option = {
  description?: string;
  id?: string;
  title: string;
  path: string;
};

const options: Option[] = [
  {
    id: "role",
    title: "📝 Create with Your Inputs",
    description:
      "Choose your role, tech stack, and interview type — we’ll generate tailored questions for you.",
    path: "/interviews/create/role",
  },
  {
    id: "ai-agent",
    title: "🎙️ AI Voice Setup",
    description:
      "Let AI guide you! Answer a few voice prompts and we’ll build a custom interview for you.",
    path: "/interviews/create/ai-agent",
  },
  {
    id: "questions",
    title: "📄 Use My Questions",
    description:
      "Already have questions? Just paste them in, and we’ll run the interview from your list.",
    path: "/interviews/create/questions",
  },
];

export default function CreateInterviewOptions() {
  return (
    <>
      {options.map((option, index) => (
        <NeonCard key={index} className="border-none flex-auto md:flex-1/3">
          <CardHeader className="text-center pb-2 relative">
            <CardTitle className="text-2xl font-bold">{option.title}</CardTitle>
          </CardHeader>
          <CardDescription className="w-11/12 mx-auto">
            {option.description || "No description available"}
          </CardDescription>
          <CardContent className="flex-1"></CardContent>
          <CardFooter className="flex justify-center items-center">
            <Button
              className="cursor-pointer text-xl rounded-2xl px-10 border-stone-50 hover:!border-primary hover:text-primary"
              variant="outline"
              onClick={() => redirect(option.path)}
            >
              Create
            </Button>
          </CardFooter>
        </NeonCard>
      ))}
    </>
  );
}

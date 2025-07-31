import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Interview } from "@prisma/client";
import { Bot, Building, Clock, Play } from "lucide-react";
import animations from "../animations";

const interviewTypes = new Map([
  ["Technical", "bg-green-500 text-white dark:bg-green-600"],
  ["Behavioral", "bg-blue-500 text-white dark:bg-blue-600"],
]);
export default function InterviewCard(
  props: Interview & { className: string; onAction: (id: string) => void }
) {
  return (
    <animations.Stagger>
      <Card className={`group relative ${props.className}`}>
        <CardHeader>
          <div className="flex row-flex justify-between items-center">
            <CardTitle>{props.role}</CardTitle>
            <Badge
              variant="default"
              className={interviewTypes.get(props.type || "")}
            >
              {props.type}
            </Badge>
          </div>
          <CardDescription className="text-xs">{props.level}</CardDescription>
        </CardHeader>
        <CardContent className="flex-auto">
          <div className="flex flex-col justify-end w-full h-full gap-2">
            <CardDescription>
              <div className="flex flex-row gap-2 items-center">
                <Clock className=" w-4 h-4" />
                <div className="">{"Created At:" + props.createdAt}</div>
              </div>
            </CardDescription>
            <CardDescription>
              <div className="flex flex-row gap-2 items-center">
                <Building className="w-4 h-4" />
                <div>{"Tech Stacks: " + props.techStack}</div>
              </div>
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <CardAction className="w-full">
            <Button
              className="w-full rounded-2xl"
              variant="secondary"
              onClick={() => props.onAction(props.id)}
            >
              <Play />
              Start the Interview
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </animations.Stagger>
  );
}

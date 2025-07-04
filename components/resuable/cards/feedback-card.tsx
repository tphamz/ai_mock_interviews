import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Star } from "lucide-react";

type Props = {
  title: string;
  status: "complete" | "in-progress";
  rating?: number;
  duration: string;
  aiAgent: string;
  className?: string;
};

const badgeStatus = new Map<string, [string, string]>([
  ["complete", ["bg-green-500 text-white dark:bg-green-600", "Completed"]],
  ["in-progress", ["bg-blue-500 text-white dark:bg-blue-600", "In Progress"]],
]);
export default function FeedbackCard(props: Props) {
  return (
    <Card className={`${props.className || ""} `}>
      <CardHeader>
        <div className="flex row-flex justify-between items-center">
          <CardTitle>{props.title}</CardTitle>
          <Badge
            variant="default"
            className={badgeStatus.get(props.status)![0]}
          >
            {badgeStatus.get(props.status)![1]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-auto">
        <div className="flex flex-col justify-end w-full h-full gap-2">
          <div className="flex flex-row gap-1">
            <Star
              className={
                Math.floor((props.rating || 0) / 1) ? "fill-amber-400" : ""
              }
            />
            <Star
              className={
                Math.floor((props.rating || 0) / 2) ? "fill-amber-400" : ""
              }
            />
            <Star
              className={
                Math.floor((props.rating || 0) / 3) ? "fill-amber-400" : ""
              }
            />
            <Star
              className={
                Math.floor((props.rating || 0) / 4) ? "fill-amber-400" : ""
              }
            />
            <Star
              className={
                Math.floor((props.rating || 0) / 5) ? "fill-amber-400" : ""
              }
            />
          </div>
          <CardDescription>
            <div className="flex flex-row gap-2 items-center">
              <Clock className="text-muted-foreground w-4 h-4" />
              <div className="text-muted-foreground">{props.duration}</div>
            </div>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Interview By: {props.aiAgent}
        </p>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Play, ReceiptText, Star } from "lucide-react";
import animations from "../animations";
import { Button } from "@/components/ui/button";

export type FeedbackProps = {
  id: string;
  interview: { role: string; level: string; type: string };
  createdDate: string;
  categoryScores: { name: string; score: number; comment: string }[];
  className?: string;
  onAction?: (id: string) => void;
};
export default function FeedbackCard(props: FeedbackProps) {
  const score =
    (props.categoryScores || []).reduce(
      (res: number, item: any) => res + item.score,
      0
    ) / (props.categoryScores || []).length;
  return (
    <animations.Stagger
      options={{ delay: 0.5 }}
      className={`${props.className || ""}`}
    >
      <Card>
        {props.interview && (
          <CardHeader>
            <div className="flex row-flex justify-between items-center">
              <CardTitle>{props.interview.role}</CardTitle>
              <CardDescription>{props.interview.type}</CardDescription>
            </div>
            <CardDescription>{props.interview.level}</CardDescription>
          </CardHeader>
        )}
        <CardContent className="flex-auto">
          <div className="flex flex-col justify-end w-full h-full gap-2">
            <div className="flex flex-row gap-1">
              <Star className={Math.floor(score / 1) ? "fill-amber-400" : ""} />
              <Star className={Math.floor(score / 2) ? "fill-amber-400" : ""} />
              <Star className={Math.floor(score / 3) ? "fill-amber-400" : ""} />
              <Star className={Math.floor(score / 4) ? "fill-amber-400" : ""} />
              <Star className={Math.floor(score / 5) ? "fill-amber-400" : ""} />
            </div>
            <CardDescription>
              <div className="flex flex-col gap-1 mt-2">
                {(props.categoryScores || []).map((item, index) => (
                  <div className="text-muted-foreground" key={index}>
                    <span className="font-bold">{item.name}: </span>
                    <span>{item.score}</span>
                  </div>
                ))}
              </div>
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <CardAction className="w-full">
            <Button
              className="w-full rounded-2xl"
              variant="secondary"
              onClick={() => (props.onAction ? props.onAction(props.id) : null)}
            >
              <ReceiptText />
              View Detail
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </animations.Stagger>
  );
}

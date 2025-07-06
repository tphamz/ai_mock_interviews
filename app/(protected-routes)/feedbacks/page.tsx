import FeedbackCard from "@/components/resuable/cards/feedback-card";
import { getFeedbacks } from "@/lib/actions/feedback.action";
import { toast } from "sonner";
import interviews from "@/constants/interviews.json";

const interviewsById = new Map(interviews.map((item) => [item.id, item]));
export default async function FeedbackPage() {
  const result: any = await getFeedbacks({});
  if (!result.data) return toast.error("Error", { description: result.error });
  const feedbacks = result.data.items.map((item: any) => ({
    ...item,
    interview: item.Interview || interviewsById.get(item.id),
  }));
  return (
    <div className="flex flex-row items-center w-full h-full flex-wrap gap-4">
      {feedbacks.map((item: any, index: number) => (
        <FeedbackCard
          key={index}
          {...item}
          className="w-[450px] h-[250px] border-muted"
        />
      ))}
    </div>
  );
}

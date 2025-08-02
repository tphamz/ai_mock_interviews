import FeedbackCard from "@/components/resuable/cards/feedback-card";
import { getFeedbacks } from "@/lib/actions/feedback.action";
import { toast } from "sonner";
import FeedbackList from "./_feedback-list";

export default async function FeedbackPage() {
  const result: any = await getFeedbacks({});
  if (!result.data) return toast.error("Error", { description: result.error });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center gap-5 flew-wrap md:flex-row justify-center">
        <FeedbackList data={result.data.items} />
      </div>
    </div>
  );
}

import FeedbackCard from "@/components/resuable/cards/feedback-card";
import { getFeedbacks } from "@/lib/actions/feedback.action";
import { toast } from "sonner";
import FeedbackList from "./_feedback-list";

export default async function FeedbackPage() {
  const result: any = await getFeedbacks({});
  if (!result.data) return toast.error("Error", { description: result.error });

  return <FeedbackList data={result.data.items} />;
}

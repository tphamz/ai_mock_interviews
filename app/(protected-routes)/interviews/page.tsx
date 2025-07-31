import { getInterviews } from "@/lib/actions/interview.action";
import { toast } from "sonner";
import InterviewList from "./_interview-list";
import { Title, Subtitle } from "@/components/resuable/title";

export default async function Interviews() {
  const response = await getInterviews({});
  if (response.status !== 200) {
    return toast.error("Error", { description: response.error });
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center gap-5 flew-wrap md:flex-row justify-center">
        <InterviewList data={response.data?.items} />
      </div>
    </div>
  );
}

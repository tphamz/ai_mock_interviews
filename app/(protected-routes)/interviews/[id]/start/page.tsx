"use client";
import { getInterviewById } from "@/lib/actions/interview.action";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CallScreen from "@/components/resuable/call-screen";
import { interviewer } from "@/constants/vapi";
import { createFeedback } from "@/lib/actions/feedback.action";
import { toast } from "sonner";
import { useLoggedInUser } from "@/lib/stores/useLoggedInUser";

export default function StartInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const [interview, setInterview] = useState<any>();
  const { user } = useLoggedInUser();
  const onCallEnd = async (messages: any) => {
    try {
      const body: any = { userId: user!.id as string, transcript: messages };
      if (interview.isSample) body.sampleInterviewId = interview.id;
      else body.interviewId = interview.id;
      const res: any = await createFeedback(body);
      if (res.status === 201) return router.push("/feedback");
      toast.error("Error", { description: res.error });
      return router.push("/interviews");
    } catch (err: any) {
      console.log(err);
      toast.error("Error", { description: err.message });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result: any = await getInterviewById(params.id as string);
        if (result.data) return setInterview(result.data);
      } catch (error: any) {
        toast.error("Error", { description: error.message });
        return router.push("/interviews");
      }
    })();
  }, []);

  if (!interview || !user) return <></>;
  return (
    <CallScreen
      type="start-interview"
      vapiArgs={[
        interviewer,
        {
          variableValues: {
            questions: interview.questions
              .map((item: string) => `- ${item}`)
              .join("\n"),
          },
        },
      ]}
      user={user}
      onCallEnded={onCallEnd}
    />
  );
}

"use client";
import { getInterviewById } from "@/lib/actions/interview.action";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import interviews from "@/constants/interviews.json";
import CallScreen from "@/components/resuable/call-screen";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { User } from "@prisma/client";
import { interviewer } from "@/constants/vapi";
import { createFeedback } from "@/lib/actions/feedback.action";
import { toast } from "sonner";

export default function StartInterviewPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const params = useParams();
  const [interview, setInterview] = useState<any>();
  const onCallEnd = async (messages: any) => {
    try {
      const body: any = { userId: user!.id as string, transcript: messages };
      if (interview.isSample) body.sampleInterviewId = interview.id;
      else body.interviewId = interview.id;
      const res: any = await createFeedback(body);
      if (res.status === 201) return router.push("/feedbacks");
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
        const authenticatedUser: any = await isAuthenticated();
        if (authenticatedUser.data) setUser(authenticatedUser.data);
        const result: any = await getInterviewById(params.id as string);
        if (result.data) return setInterview(result.data);
        const found = interviews.find((item: any) => params.id === item.id);
        return setInterview(found ? { ...found, isSample: true } : null);
      } catch (error) {
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

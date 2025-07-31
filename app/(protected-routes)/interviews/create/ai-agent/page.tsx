"use client";
import { Title, Subtitle } from "@/components/resuable/title";

import { isAuthenticated } from "@/lib/actions/auth.action";
import CallScreen from "@/components/resuable/call-screen";
import { redirect } from "next/navigation";
import { useLoggedInUser } from "@/lib/stores/useLoggedInUser";

export default function CreateInterviewFromAIAgent() {
  const { user } = useLoggedInUser();
  const onCallEnd = async (callDetail: any) => {
    return redirect("/interviews");
  };

  return (
    <div className="w-full h-full max-h-[100%] md:max-h-[80vh]  flex flex-col items-center gap-10">
      <Title>Create an Interview from an AI Agent</Title>
      <div className="w-full h-full flex flex-col items-center gap-10 flew-wrap md:flex-row justify-center">
        <CallScreen
          vapiArgs={[
            process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
            {
              variableValues: {
                name: user?.name,
                userId: user?.userId,
              },
            },
          ]}
          user={user!}
          onCallEnded={onCallEnd}
          type="generate-interview"
        />
      </div>
    </div>
  );
}

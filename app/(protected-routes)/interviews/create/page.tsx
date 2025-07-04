"use client";
import CallScreen from "@/components/resuable/call-screen";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { getCreateInterviewSummary } from "@/lib/actions/interview.action";
import { User } from "@prisma/client";
import { Message } from "ai";
import { useEffect, useState } from "react";

export default function CreateInterviewPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const authenticatedUser: any = await isAuthenticated();
      if (authenticatedUser.user) setUser(authenticatedUser.user);
    })();
  }, []);

  const onCallEnd = async (callDetail: any) => {
    const res = await getCreateInterviewSummary(callDetail.id);
    console.log(res);
  };

  if (!user) return <></>;
  return (
    <CallScreen
      vapiArgs={[
        process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
        {
          variableValues: {
            name: user.name,
            userid: user.id,
          },
        },
      ]}
      user={user}
      onCallEnded={onCallEnd}
      type="generate-interview"
    />
  );
}

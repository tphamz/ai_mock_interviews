"use client";
import CallScreen from "@/components/resuable/call-screen";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { User } from "@prisma/client";
import { Message } from "ai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateInterviewPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const authenticatedUser: any = await isAuthenticated();
      if (authenticatedUser.data) setUser(authenticatedUser.data);
    })();
  }, []);

  const onCallEnd = async (callDetail: any) => {
    return router.push("/interviews");
  };

  if (!user) return <></>;
  return (
    <CallScreen
      vapiArgs={[
        process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
        {
          assistantOverrides: {
            variableValues: {
              name: user.name,
              userId: user.id,
            },
          },
        },
      ]}
      user={user}
      onCallEnded={onCallEnd}
      type="generate-interview"
    />
  );
}

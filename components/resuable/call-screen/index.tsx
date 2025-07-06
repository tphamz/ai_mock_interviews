"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import { Bot, Loader2, Phone, PhoneMissed } from "lucide-react";
import CallProfile from "../call-profile/call-profile";
import { CALL_STATUS, useVapi } from "@/hooks/use-vapi";
import { useEffect } from "react";
type Props = {
  user?: User;
  vapiArgs: any[];
  onCallEnded: (val: any) => any;
  type: "generate-interview" | "start-interview";
};
let prevCallStatus = CALL_STATUS.INACTIVE;
export default function CallScreen({
  user,
  vapiArgs,
  onCallEnded,
  type,
}: Props) {
  const { callStatus, activeTranscript, messages, start, stop, toggleCall } =
    useVapi(vapiArgs);
  const handleCallClick = () => {
    if (callStatus === CALL_STATUS.ACTIVE) return stop();
    start();
  };

  useEffect(() => {
    if (
      callStatus === CALL_STATUS.INACTIVE &&
      prevCallStatus === CALL_STATUS.ACTIVE
    )
      onCallEnded(messages);
    prevCallStatus = callStatus;
  }, [callStatus]);

  return (
    <div className="relative flex flex-col md:flex-row w-full h-full gap-4">
      <Card className="flex-auto h-full relative flex flex-col rounded-2xl gap-4 p-5 md:p-10 justify-center items-center border-muted shadow-xl">
        <div className="flex flex-row justify-around items-center flex-auto w-full">
          <CallProfile
            isActive={activeTranscript?.role === "assistant"}
            icon={<Bot className="!w-20 !h-20" />}
            name="Assistant"
          />
          <CallProfile
            isActive={activeTranscript?.role === "user"}
            name={user?.name}
            profile={user?.profileImage}
          />
        </div>
        <Button
          className={`bg-green rounded-4xl w-[150px] ${
            callStatus === CALL_STATUS.INACTIVE ? " bg-green-600" : "bg-red-500"
          } text-amber-50`}
          disabled={callStatus === CALL_STATUS.LOADING}
          onClick={handleCallClick}
        >
          {callStatus === CALL_STATUS.INACTIVE ? (
            <Phone className="!w-5 !h-5 text-amber-50" />
          ) : callStatus === CALL_STATUS.LOADING ? (
            <Loader2 className="!w-5 !h-5 animate-spin" />
          ) : (
            <PhoneMissed className="!w-5 !h-5 text-amber-50" />
          )}
          Call
        </Button>
      </Card>
      <Card className="rounded-2xl md:w-[500px] w-full md:h-full border-muted shadow-xl card-bg">
        <CardContent className="w-full h-full overflow-y-auto">
          {messages.map((item) => (
            <p>
              <span className="font-bold capitalize">{item.role}:</span>
              <span className="italic">{item.transcript}</span>
            </p>
          ))}
          {activeTranscript && (
            <p>
              <span className="font-bold capitalize">
                {activeTranscript.role}:
              </span>
              <span className="italic">{activeTranscript.transcript}</span>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

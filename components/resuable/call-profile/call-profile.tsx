"use client";
import Orb from "@/components/animations/Orb/Orb";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ReactNode, useMemo } from "react";

export default function CallProfile({
  profile,
  name = "",
  isActive,
  className = "",
  icon,
}: {
  icon?: ReactNode;
  profile?: string;
  className?: string;
  name?: string;
  isActive: boolean;
}) {
  const hollowColor = useMemo(() => Math.floor(361 * Math.random()), []);
  return (
    <div
      className={`${className} w-[240px] h-[240px] rounded-[50%] relative flex flex-col justify-center items-center`}
    >
      <Avatar className="w-[160px] h-[160px] flex flex-row justify-center items-center bg-muted rounded-full interview-cover z-1 text-amber-50 overflow-hidden">
        {profile && (
          <AvatarImage
            src={profile}
            className="rounded-b-full object-contain"
          />
        )}
        {name && !icon && (
          <AvatarFallback className="text-amber-50">
            {name
              .split(" ")
              .map((item) => item[0])
              .join("")}
          </AvatarFallback>
        )}
        {icon}
      </Avatar>
      <div className="absolute bottom-[-5px] text-lg font-bold flex flex-row w-full justify-center items-center">
        {name}
      </div>
      <div
        className={`absolute w-full h-full top-0 left-0 rounded-b-full opacity-0 animate-heartbeat ${
          isActive ? "!opacity-[100]" : ""
        } transition transform ease-in duration-100 z-[0]`}
      >
        <Orb
          hoverIntensity={0.1}
          rotateOnHover={true}
          hue={hollowColor}
          forceHoverState
        />
      </div>
    </div>
  );
}

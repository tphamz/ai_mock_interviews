import { User } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SelectTheme from "./select-theme";
import { Separator } from "@/components/ui/separator";

export default function Header({ user }: { user: User }) {
  return (
    <header className="sticky z-[10] top-0 shrink-0 flex flex-wrap items-center justify-between gap-2 bg-transparent p-4 realtive">
      <div className="absolute w-full h-full bg-black opacity-5 left-0 z-[-1]" />
      <div />
      <div className="flex flex-row justify-center items-center gap-3">
        <Avatar>
          <AvatarImage
            src={user.profileImage}
            className="border-r-1 object-contain"
          />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((item) => item[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="text-accent-foreground text-sm">{user.name}</div>
        <Separator orientation="vertical" className="!h-6" />
        <SelectTheme />
      </div>
    </header>
  );
}

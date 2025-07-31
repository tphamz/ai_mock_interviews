"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SelectTheme from "./select-theme";
import { Separator } from "@/components/ui/separator";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuth } from "@clerk/nextjs";
import { useLoggedInUser } from "@/lib/stores/useLoggedInUser";
import { User } from "@/types";
import { ReactNode, useEffect } from "react";

type Props = {
  user: User;
  children: ReactNode;
};
export default function Header({ user, children }: Props) {
  const { setUser } = useLoggedInUser();
  const { signOut } = useAuth();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <header className="sticky z-[10] top-0 shrink-0 flex flex-wrap items-center justify-between gap-2 p-4 bg-background !rounded-tl-4xl border-b-[0.5px] border-b-accent">
      <div>{children}</div>
      <div className="flex flex-row justify-center items-center gap-3">
        <Menubar className="border-none shadow-none bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className="gap-2">
              <Avatar>
                <AvatarImage
                  src={user?.imageUrl}
                  className="border-r-1 object-contain"
                />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
              <div className="text-accent-foreground text-sm">{user?.name}</div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => signOut()}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Separator orientation="vertical" className="!h-6" />
        <SelectTheme />
      </div>
    </header>
  );
}

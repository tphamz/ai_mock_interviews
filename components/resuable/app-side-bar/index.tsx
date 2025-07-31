"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { usePathname, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export type NavProp = {
  title: string;
  items: NavItem[];
};

export type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
};

export type SideBarProps = React.ComponentProps<typeof Sidebar> & {
  logo?: React.ReactNode;
  data?: NavProp[];
  footer?: React.ReactNode;
};

export function AppSidebar({
  logo = <></>,
  data = [],
  footer = <></>,
  ...rest
}: SideBarProps) {
  const currentPath = usePathname();
  const isCurrentPath = (path: string) => {
    const paths = currentPath.split("/");
    while (paths.length > 1) {
      if (paths.join("/") === path) return true;
      paths.pop();
    }
    return false;
  };

  return (
    <Sidebar collapsible="icon" variant="inset" {...rest}>
      <SidebarHeader className="h-16 max-md:mt-2 mb-2 justify-center">
        {logo}
      </SidebarHeader>
      <SidebarContent className="-mt-2">
        {data.map((nav: NavProp) => (
          <SidebarGroup key={nav.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/65">
              {nav.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {nav.items.map((item: NavItem) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button group-data-[collapsible=icon]:px-[5px]! font-medium gap-5 h-9 [&>svg]:size-auto"
                      tooltip={item.title}
                      isActive={isCurrentPath(item.path)}
                    >
                      <Button
                        variant="ghost"
                        onClick={() => redirect(item.path)}
                        className="flex flex-row w-full justify-start"
                      >
                        {item.icon ? item.icon : <></>}
                        <span>{item.title}</span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>{footer}</SidebarFooter>
    </Sidebar>
  );
}

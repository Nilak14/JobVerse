"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export function SidebarTop({
  userName,
  userSubType,
  isLoading,
}: {
  userName: string;
  userSubType?: "FREE" | "PRO" | "ELITE";
  isLoading: boolean;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent  data-[state=open]:text-sidebar-accent-foreground "
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={"/logo/jobverse_bg.svg"} alt={"JV"} />
              <AvatarFallback className="rounded-lg">JV</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold relative">
              JobVerse{" "}
              {!isLoading && userSubType && userSubType !== "FREE" && (
                <span className=" text-amber-400 text-xs absolute ml-1 bottom-[5.1px] z-[99999] ">{`${userSubType}`}</span>
              )}
            </span>
            {isLoading ? (
              <Skeleton className="h-1 w-1/2 bg-gray-400" />
            ) : (
              <span className="truncate text-xs text-muted-foreground">
                {userName}
              </span>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

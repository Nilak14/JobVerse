"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { ExtendedUser } from "@/next-auth";
import LogOutModal from "../Global/LogOutModal";
import React from "react";
import UserAvatar from "../Global/Useravatar";
import EmployerUserMenu from "../Global/EmployerUserMenu";
import JobSeekerUserMenu from "../Global/JobSeekerUserMenu";
import AdminUserMenu from "../Global/AdminUserMenu";
import ThemeSelect from "../Global/ThemeSelect";
import UseCurrentSession from "@/hooks/use-session";

export function SidebarUser({
  isLoading,
  user,
  isNav = false,
}: {
  user: ExtendedUser;
  isLoading: boolean;
  isNav?: boolean;
}) {
  const { isMobile } = useSidebar();
  const [open, setOpen] = React.useState(false);
  UseCurrentSession();
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserAvatar imageUrl={user?.avatarUrl} userName={user?.name!} />
                {isNav || (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {isLoading ? (
                      <>
                        <Skeleton className="w-[70%] mb-2 h-2 bg-gray-400" />
                        <Skeleton className="w-full h-2 bg-gray-400" />
                      </>
                    ) : (
                      <>
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </>
                    )}
                  </div>
                )}
                {isNav || <ChevronsUpDown className="ml-auto size-4" />}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : isNav ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <UserAvatar
                    imageUrl={user?.avatarUrl}
                    userName={user?.name!}
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.type === "EMPLOYER" && <EmployerUserMenu />}
              {user.type === "JOB_SEEKER" && <JobSeekerUserMenu />}
              {user.type === "ADMIN" && <AdminUserMenu />}
              <DropdownMenuSeparator />
              <ThemeSelect />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <LogOutModal open={open} setOpen={setOpen} />
    </>
  );
}

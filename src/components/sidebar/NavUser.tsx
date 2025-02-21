"use client";

import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ExtendedUser } from "@/next-auth";
import LogOutModal from "../Global/LogOutModal";
import React from "react";
import UserAvatar from "../Global/Useravatar";
import EmployerUserMenu from "../Global/EmployerUserMenu";
import JobSeekerUserMenu from "../Global/JobSeekerUserMenu";
import AdminUserMenu from "../Global/AdminUserMenu";
import ThemeSelect from "../Global/ThemeSelect";
import UseCurrentSession from "@/hooks/use-session";

export function NavUser({ user }: { user: ExtendedUser }) {
  const [open, setOpen] = React.useState(false);
  UseCurrentSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground outline-none border-none appearance-none ring-0">
            <UserAvatar imageUrl={user?.avatarUrl} userName={user?.name!} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={"bottom"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <UserAvatar imageUrl={user?.avatarUrl} userName={user?.name!} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user.type === "EMPLOYER" && <EmployerUserMenu user={user} />}
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

      <LogOutModal open={open} setOpen={setOpen} />
    </>
  );
}

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon, MoreHorizontal } from "lucide-react";

interface JobTableRowActionProps {
  applicationId: string;

  TriggerIcon?: LucideIcon;
}

const ApplicationTableAction = ({
  applicationId,

  TriggerIcon = MoreHorizontal,
}: JobTableRowActionProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center"
          asChild
        >
          <button className="h-8 w-8 p-0 outline-none border-none ring-0">
            <span className="sr-only">Open menu</span>
            <TriggerIcon className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ApplicationTableAction;

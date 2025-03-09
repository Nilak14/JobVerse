"use client";
import { BadgeCheck, Bell, CreditCard, Sparkles } from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import usePremiumModal from "@/store/usePremiumModal";
import Link from "next/link";
const JobSeekerUserMenu = () => {
  const { setOpenPremiumModal } = usePremiumModal();
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => setOpenPremiumModal(true)}>
          <Sparkles />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheck />
          Account (Job Seeker)
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/job-seeker/billing"}>
            <CreditCard />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
export default JobSeekerUserMenu;

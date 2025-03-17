import { BadgeCheck, CreditCard, Mail, Sparkles } from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { ExtendedUser } from "@/next-auth";
import { useInvitationModal } from "@/store/useInvitaionModal";
import { usePendingInvitationsCount } from "@/store/usePendingInvitationsCount";
import Link from "next/link";

interface EmployerUserMenuProps {
  user: ExtendedUser;
}

const EmployerUserMenu = ({ user }: EmployerUserMenuProps) => {
  const { setOpenInvitationModal } = useInvitationModal();
  const { pendingInvitationsCount } = usePendingInvitationsCount();
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Sparkles />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheck />
          Account (Employer)
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/employer/billing"}>
            <CreditCard />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setOpenInvitationModal(true);
          }}
        >
          <Mail />
          <p className="relative">
            {pendingInvitationsCount > 0 && (
              <span className="absolute -right-6 -top-3 rounded-full bg-primary text-white px-1 text-xs font-medium tabular-nums">
                {pendingInvitationsCount}
              </span>
            )}
            View Pending Invitations
          </p>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
export default EmployerUserMenu;

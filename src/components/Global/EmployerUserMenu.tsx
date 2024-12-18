import { BadgeCheck, CreditCard, Mail, Sparkles } from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import InvitationsModal from "../InvitationsModal";
import { ExtendedUser } from "@/next-auth";
import { useInvitationModal } from "@/store/useInvitaionModal";

interface EmployerUserMenuProps {
  user: ExtendedUser;
}

const EmployerUserMenu = ({ user }: EmployerUserMenuProps) => {
  const { openInvitationModal, setOpenInvitationModal } = useInvitationModal();
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
        <DropdownMenuItem>
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            setOpenInvitationModal(true);
          }}
        >
          <Mail />
          View Invitations
        </DropdownMenuItem>
      </DropdownMenuGroup>
      {openInvitationModal && <InvitationsModal user={user} />}
    </>
  );
};
export default EmployerUserMenu;

import { AllUsers } from "@/lib/prisma-types/User";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import {
  AlertCircle,
  LockKeyhole,
  LucideIcon,
  MapPin,
  MoreHorizontal,
  ScanEye,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import LoadingButton from "../ui/loading-button";
import { toast } from "sonner";
import { blockUser } from "@/actions/adminActions/user/blockUser";
import Link from "next/link";
interface AllUserTableActionProps {
  user: AllUsers;
  TriggerIcon?: LucideIcon;
}
const AllUserTableAction = ({
  user,
  TriggerIcon = MoreHorizontal,
}: AllUserTableActionProps) => {
  const [openBlockAlert, setOpenBlockAlert] = useState(false);
  if (user.userType === "ADMIN") {
    return;
  }
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
          {/* <DropdownMenuItem asChild>
            <Link href={`/admin/user/${user.id}`}>
              <ScanEye color="orange" className="h-4 w-4 mr-2 " />
              <span>View Details</span>
            </Link>
          </DropdownMenuItem> */}
          {user.latitude && user.longitude && (
            <DropdownMenuItem asChild>
              <Link
                target="_blank"
                href={`https://www.google.com/maps?q=${user.latitude},${user.longitude}`}
              >
                <MapPin color="orange" className="h-4 w-4 mr-2 " />
                <span>View Location</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setOpenBlockAlert(true)}>
            <LockKeyhole color="red" className="h-4 w-4 mr-2 " />
            <span>{user.isBlocked ? "Unblock" : "Block"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BlockUserModal
        user={user}
        open={openBlockAlert}
        setOpen={setOpenBlockAlert}
      />
    </>
  );
};
export default AllUserTableAction;

interface ModalProps {
  user: AllUsers;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const BlockUserModal = ({ user, open, setOpen }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const isBlocked = user.isBlocked;
  const handleToggleBlockUser = async () => {
    try {
      setLoading(true);
      const res = await blockUser(user.id);
      if (res.success) {
        setOpen(false);
        toast.success(res.message, { id: "user-block" });
      } else {
        toast.error(res.message, { id: "user-block" });
      }
    } catch (error) {
      if (user.isBlocked) {
        toast.error("User unblocked successfully", { id: "user-block" });
      } else {
        toast.error("User blocked successfully", { id: "user-block" });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        isloading={loading ? "true" : undefined}
        className="space-y-5 md:space-y-0"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            {isBlocked ? "Unblock User" : "Block User"} ?
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            {isBlocked
              ? "Are you sure you want to unblock this user ?"
              : "Are you sure you want to block this user ?"}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />

          <AlertDescription>
            {isBlocked
              ? "This user is currently blocked. Unblocking will allow them to access your platform."
              : " By blocking this user, you will prevent them from accessing your platform. Please confirm that you want to proceed."}
          </AlertDescription>
        </Alert>
        <ResponsiveModalFooter>
          <div className="w-full flex gap-5 flex-col md:flex-row">
            <Button
              disabled={loading}
              onClick={() => setOpen(false)}
              className="w-full "
              variant={"secondary"}
            >
              Cancel
            </Button>
            <LoadingButton
              showIconOnly
              loading={loading}
              onClick={() => handleToggleBlockUser()}
              className="w-full"
            >
              {isBlocked ? "Unblock" : "Block"}
            </LoadingButton>
          </div>
        </ResponsiveModalFooter>
        <p className="text-sm text-muted-foreground text-center">
          You are {isBlocked ? "unblocking" : "blocking"} user with email:
          <span className="text-foreground ml-1">{user.email}</span>
        </p>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

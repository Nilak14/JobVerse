import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import LoadingButton from "../ui/loading-button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";

interface LogOutModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LogOutModal = ({ open, setOpen }: LogOutModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const logOut = async () => {
    setIsLoading(true);
    await signOut();
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent isloading={isLoading ? "true" : undefined}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Are You Sure You Want to Log Out?
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            You are about to log out of your account. Are you sure you want to
            leave? If you're done, click Log Out, otherwise click Cancel to stay
            logged in.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter className="mt-5">
          <div className="flex w-full justify-between">
            <Button
              disabled={isLoading}
              onClick={() => setOpen(false)}
              variant={"outline"}
            >
              Cancel
            </Button>

            <LoadingButton loading={isLoading} onClick={logOut}>
              Log Out
            </LoadingButton>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default LogOutModal;

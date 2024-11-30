import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import LoadingButton from "../ui/loading-button";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are You Sure You Want to Log Out?</DialogTitle>
          <DialogDescription>
            You are about to log out of your account. Are you sure you want to
            leave? If you're done, click Log Out, otherwise click Cancel to stay
            logged in.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button onClick={() => setOpen(false)} variant={"outline"}>
              Cancel
            </Button>

            <LoadingButton loading={isLoading} onClick={logOut}>
              Log Out
            </LoadingButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default LogOutModal;

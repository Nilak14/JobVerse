import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "../ui/loading-button";
import { sendEmailVerificationLink } from "@/actions/auth/sendEmailVerification";
import { toast } from "sonner";
import { useState } from "react";
interface SendEmailVerificationModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userEmail: string;
}
const SendEmailVerificationModel = ({
  open,
  setOpen,
  userEmail,
}: SendEmailVerificationModelProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email Not Verified</DialogTitle>
          <DialogDescription>
            Click on the button below to send a verification link to your email
          </DialogDescription>
        </DialogHeader>
        <LoadingButton
          loading={loading}
          onClick={async () => {
            setLoading(true);
            const res = await sendEmailVerificationLink(userEmail, null);
            setLoading(false);
            if (res.error) {
              toast.error(res.error, {
                id: "login-error",
              });
              setOpen(false);
            } else if (toast.success) {
              toast.success(res.success, {
                id: "login-error",
              });
              setOpen(false);
            }
          }}
        >
          Send Verification Link
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
};
export default SendEmailVerificationModel;

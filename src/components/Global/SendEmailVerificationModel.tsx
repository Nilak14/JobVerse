import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";

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
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Email Not Verified</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Click on the button below to send a verification link to your email
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <LoadingButton
          className="w-full md:w-1/2 m-auto mt-4 md:mt-0"
          loading={loading}
          onClick={async () => {
            if (!userEmail) {
              toast.error("Email not found", {
                id: "login-error",
              });
              setOpen(false);
              return;
            }
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
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default SendEmailVerificationModel;

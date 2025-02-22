import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { JobSeekerProfileComponentProps } from "@/lib/types";
import { Info } from "lucide-react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { useState } from "react";
import { toast } from "sonner";
import { toggleTwoFactorAuthentication } from "@/actions/settings/toggleTwoFactorAuthentication";
const ToggleTwoFactorAuthentication = ({
  profile,
}: JobSeekerProfileComponentProps) => {
  const enabled = profile.isTwoFactorEnabled;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleTwoFactorAuthenticationAction = async () => {
    setLoading(true);
    try {
      const res = await toggleTwoFactorAuthentication(!enabled);
      if (res.success) {
        toast.success(res.message, { id: "toggle-two-factor-authentication" });
        setOpen(false);
      } else {
        toast.error(res.message, { id: "toggle-two-factor-authentication" });
      }
    } catch (error) {
      toast.error("Failed to toggle two factor authentication", {
        id: "toggle-two-factor-authentication",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={enabled ? "secondary" : "default"}
        className="w-full md:w-auto mt-5"
      >
        {enabled ? "Disable" : "Enable"}
      </Button>
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalContent isloading={loading ? "true" : undefined}>
          <ResponsiveModalHeader className="sr-only">
            <ResponsiveModalTitle>
              Enable Two Factor Authentication
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Enable this Two Factor Authentication To Make your Account More
              Secure
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <div>
            <Alert className="my-5" variant={enabled ? "destructive" : "info"}>
              <Info className="h-4 w-4" />
              <AlertTitle>
                {enabled ? "Disable" : "Enable"} Two Factor Authentication
              </AlertTitle>
              <AlertDescription>
                {enabled
                  ? "Disabling This Will Make Your Account Less Secure And Safe From Unauthorized Access"
                  : "Enabling This Will Make Your Account More Secure And Safe From"}
              </AlertDescription>
            </Alert>
            <div className="flex gap-4">
              <DialogClose disabled={loading} asChild>
                <Button className="flex-1" variant={"secondary"}>
                  Cancel
                </Button>
              </DialogClose>
              <LoadingButton
                className="flex-1"
                loading={loading}
                showIconOnly
                onClick={toggleTwoFactorAuthenticationAction}
              >
                {enabled ? "Disable" : "Enable"}
              </LoadingButton>
            </div>
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};
export default ToggleTwoFactorAuthentication;

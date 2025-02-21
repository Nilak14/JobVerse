import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { Info } from "lucide-react";
const ToggleTwoFactorAuthentication = () => {
  const enabled = false;
  return (
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
        <DialogClose asChild>
          <Button className="flex-1" variant={"secondary"}>
            Cancel
          </Button>
        </DialogClose>
        <LoadingButton className="flex-1" loading={false}>
          {enabled ? "Disable" : "Enable"}
        </LoadingButton>
      </div>
    </div>
  );
};
export default ToggleTwoFactorAuthentication;

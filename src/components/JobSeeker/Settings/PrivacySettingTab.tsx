import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "./ChangePasswordForm";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-dailog";
import { Button } from "@/components/ui/button";
import { EyeOff, KeyRound, Lock } from "lucide-react";
import ToggleTwoFactorAuthentication from "./ToggleTwoFactorAuthentication";
import { Switch } from "@/components/ui/switch";
import { getClientSession } from "@/store/getClientSession";
import AccountSecuritySkeleton from "@/components/skeletons/AccountSecuritySkeleton";

const PrivacySettingTab = () => {
  const { session, status } = getClientSession();
  console.log(session);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Security</CardTitle>
        <CardDescription>
          Manage your account security and privacy settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "loading" ? (
          <AccountSecuritySkeleton />
        ) : (
          <>
            <div className="space-y-3 mb-4">
              <h3 className="font-bold">Account Security</h3>

              <div className="flex justify-between items-center flex-col md:flex-row p-4 border-input border-2  rounded-lg">
                <div className="flex items-center gap-5">
                  <KeyRound className="hidden md:block" />
                  <div className="space-y-1">
                    <p>Change Password</p>
                    <p className="text-xs text-muted-foreground">
                      Ensure to make your password strong and secure to protect
                      your account
                    </p>
                  </div>
                </div>
                <ResponsiveModal>
                  <ResponsiveModalTrigger asChild>
                    <Button className="w-full md:w-auto mt-5">
                      Change Password
                    </Button>
                  </ResponsiveModalTrigger>
                  <ResponsiveModalContent>
                    <ResponsiveModalHeader className="sr-only">
                      <ResponsiveModalTitle>
                        Change Your Password
                      </ResponsiveModalTitle>
                      <ResponsiveModalDescription>
                        This form is for the changing your password
                      </ResponsiveModalDescription>
                    </ResponsiveModalHeader>
                    <ChangePasswordForm />
                  </ResponsiveModalContent>
                </ResponsiveModal>
              </div>
              <div className="flex justify-between items-center flex-col md:flex-row p-4 border-input border-2  rounded-lg">
                <div className="flex items-center gap-5">
                  <Lock className="hidden md:block" />
                  <div className="space-y-1">
                    <p>Two Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">
                      Enable this Two Factor Authentication To Make your Account
                      More Secure
                    </p>
                  </div>
                </div>
                <ResponsiveModal>
                  <ResponsiveModalTrigger asChild>
                    <Button className="w-full md:w-auto mt-5">Enable</Button>
                  </ResponsiveModalTrigger>
                  <ResponsiveModalContent>
                    <ResponsiveModalHeader className="sr-only">
                      <ResponsiveModalTitle>
                        Enable Two Factor Authentication
                      </ResponsiveModalTitle>
                      <ResponsiveModalDescription>
                        Enable this Two Factor Authentication To Make your
                        Account More Secure
                      </ResponsiveModalDescription>
                    </ResponsiveModalHeader>
                    <ToggleTwoFactorAuthentication />
                  </ResponsiveModalContent>
                </ResponsiveModal>
              </div>
            </div>
            <Separator />
            <div className="space-y-3 mb-4 mt-4">
              <h3 className="font-bold">Privacy Settings</h3>
              <div className="flex justify-between items-center  p-4 border-input border-2  rounded-lg">
                <div className="flex items-center gap-5">
                  <EyeOff className="hidden md:block" />
                  <div className="space-y-1">
                    <p>Profile Visibility</p>
                    <p className="text-xs text-muted-foreground">
                      Allow recruiters to find your profile or visit your
                      profile
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default PrivacySettingTab;

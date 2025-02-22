import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "./ChangePasswordForm";
import { EyeOff, KeyRound, Lock } from "lucide-react";
import ToggleTwoFactorAuthentication from "./ToggleTwoFactorAuthentication";
import { Switch } from "@/components/ui/switch";
import { getClientSession } from "@/store/getClientSession";
import AccountSecuritySkeleton from "@/components/skeletons/AccountSecuritySkeleton";
import { JobSeekerProfileComponentProps } from "@/lib/types";
import { useOptimistic, useTransition } from "react";
import { toggleProfileVisibility } from "@/actions/settings/toggleProfileVisibility";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type VisibilityState = {
  value: boolean;
  pending?: boolean;
};

const PrivacySettingTab = ({ profile }: JobSeekerProfileComponentProps) => {
  const { session, status } = getClientSession();
  const initialVisibility =
    profile.JOB_SEEKER?.JobSeekerProfile?.profileVisibility ?? true;

  const [isPending, startTransition] = useTransition();

  const [optimisticState, updateOptimisticState] = useOptimistic<
    VisibilityState,
    boolean
  >({ value: initialVisibility }, (state, newValue) => ({
    value: newValue,
    pending: true,
  }));

  const handleCheckChange = async (newStatus: boolean) => {
    startTransition(async () => {
      updateOptimisticState(newStatus);

      try {
        const res = await toggleProfileVisibility(newStatus);

        if (res.success) {
          updateOptimisticState(newStatus);
          toast.success(res.message, { id: "toggle-profile-visibility" });
        } else {
          updateOptimisticState(!newStatus);
          toast.error(res.message, { id: "toggle-profile-visibility" });
        }
      } catch (error) {
        updateOptimisticState(!newStatus);
        toast.error("Failed to update profile visibility", {
          id: "toggle-profile-visibility",
        });
      }
    });
  };

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
            {!session?.user.isOAuthUser && (
              <div className="space-y-3 mb-4">
                <h3 className="font-bold">Account Security</h3>

                <div className="flex justify-between items-center flex-col md:flex-row p-4 border-input border-2 rounded-lg">
                  <div className="flex items-center gap-5">
                    <KeyRound className="hidden md:block" />
                    <div className="space-y-1">
                      <p>Change Password</p>
                      <p className="text-xs text-muted-foreground">
                        Ensure to make your password strong and secure to
                        protect your account
                      </p>
                    </div>
                  </div>
                  <ChangePasswordForm />
                </div>
                <div className="flex justify-between items-center flex-col md:flex-row p-4 border-input border-2 rounded-lg">
                  <div className="flex items-center gap-5">
                    <Lock className="hidden md:block" />
                    <div className="space-y-1">
                      <p>
                        Two Factor Authentication{" "}
                        <span className="text-primary text-sm">
                          (
                          {profile.isTwoFactorEnabled
                            ? "Currently On"
                            : "Currently Off"}
                          )
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Enable this Two Factor Authentication To Make your
                        Account More Secure
                      </p>
                    </div>
                  </div>
                  <ToggleTwoFactorAuthentication profile={profile} />
                </div>
              </div>
            )}
            <Separator />
            <div className="space-y-3 mb-4 mt-4">
              <h3 className="font-bold">Privacy Settings</h3>
              <div className="flex justify-between items-center p-4 border-input border-2 rounded-lg">
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
                <div className="flex gap-3 items-center">
                  <Switch
                    className={cn(
                      "disabled:opacity-100",
                      isPending && "animate-pulse"
                    )}
                    checked={optimisticState.value}
                    onCheckedChange={handleCheckChange}
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PrivacySettingTab;

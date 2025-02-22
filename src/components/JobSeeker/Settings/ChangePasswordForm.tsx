import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PasswordInput } from "@/components/ui/password-input";
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TriangleAlert } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/actions/auth/changePassword";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
const ChangePasswordForm = () => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const { execute, isPending } = useAction(changePassword, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setOpenChangePassword(false);
        toast.success(data.message, { id: "change-password" });
      } else {
        toast.error(data?.message || "Something went wrong", {
          id: "change-password",
        });
      }
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "change-password",
      });
    },
  });

  const form = useForm<ChangePasswordSchemaType>({
    defaultValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    },
    mode: "onChange",

    resolver: zodResolver(ChangePasswordSchema),
  });
  const changePasswordSubmit = (data: ChangePasswordSchemaType) => {
    execute(data);
  };

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [openChangePassword, setOpenChangePassword]);

  return (
    <>
      <Button
        onClick={() => setOpenChangePassword(true)}
        className="w-full md:w-auto mt-5"
      >
        Change Password
      </Button>
      <ResponsiveModal
        open={openChangePassword}
        onOpenChange={setOpenChangePassword}
      >
        <ResponsiveModalContent isloading={isPending ? "true" : undefined}>
          <ResponsiveModalHeader className="sr-only">
            <ResponsiveModalTitle>Change Your Password</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              This form is for the changing your password
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <div>
            <Alert className="my-5" variant={"warning"}>
              <TriangleAlert className="h-4 w-4" />
              <AlertDescription>
                Make Sure to make your password strong and secure to protect
                your account
              </AlertDescription>
            </Alert>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(changePasswordSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          disabled={isPending}
                          placeholder="Current Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          disabled={isPending}
                          placeholder="New Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          disabled={isPending}
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <LoadingButton
                  className="w-full"
                  loading={isPending}
                  showIconOnly
                  type="submit"
                >
                  Change Password
                </LoadingButton>
              </form>
            </Form>
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};
export default ChangePasswordForm;

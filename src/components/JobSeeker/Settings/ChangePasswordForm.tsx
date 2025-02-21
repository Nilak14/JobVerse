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
const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordSchemaType>({
    defaultValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(ChangePasswordSchema),
  });
  const changePassword = (data: ChangePasswordSchemaType) => {
    console.log(data);
  };

  return (
    <div>
      <Alert className="my-5" variant={"warning"}>
        <TriangleAlert className="h-4 w-4" />
        {/* <AlertTitle>Heads up!</AlertTitle> */}
        <AlertDescription>
          Make Sure to make your password strong and secure to protect your
          account
        </AlertDescription>
      </Alert>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(changePassword)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Current Password" {...field} />
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
                  <PasswordInput placeholder="New Password" {...field} />
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
                  <PasswordInput placeholder="Confirm Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            className="w-full"
            loading={false}
            showIconOnly
            type="submit"
          >
            Change Password
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};
export default ChangePasswordForm;

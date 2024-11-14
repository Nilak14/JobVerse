"use client";

import CardWrapper from "../Global/CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schema/PasswordResetSchema";
import LoadingButton from "../ui/loading-button";
import { PasswordInput } from "../ui/password-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { resetPassword } from "@/actions/auth/resetPassword";

const PasswordResetForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token,
    },
    mode: "onChange",
  });

  const { execute, isExecuting } = useAction(resetPassword, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error, { id: "reset-password" });
      } else if (data?.success) {
        toast.success(data?.success, { id: "reset-password" });
        router.push("/login");
      }
    },
    onError: () => {
      toast.error("Something went wrong", { id: "reset-password" });
    },
  });

  const onPasswordSubmit = async (data: ResetPasswordSchemaType) => {
    execute(data);
  };
  return (
    <section>
      <CardWrapper
        backButtonHref="/login"
        backButtonLabel="Back To Login"
        headerLabel={"Reset Your Password "}
        showFooter
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onPasswordSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isExecuting}
                      placeholder=" Password"
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
                      disabled={isExecuting}
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              loading={isExecuting}
              className="w-full"
              type="submit"
            >
              Reset Password
            </LoadingButton>
          </form>
        </Form>
      </CardWrapper>
    </section>
  );
};
export default PasswordResetForm;

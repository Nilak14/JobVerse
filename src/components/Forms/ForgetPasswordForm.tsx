"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ForgetPasswordSchema,
  ForgetPasswordSchemaType,
} from "@/schema/PasswordResetSchema";
import CardWrapper from "../Global/CardWrapper";
import LoadingButton from "../ui/loading-button";
import { sendResetPasswordVerification } from "@/actions/auth/sendResetPasswordVerification";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const ForgetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordSchemaType) => {
    startTransition(async () => {
      const { error, success } = await sendResetPasswordVerification(
        data.email
      );
      if (error) {
        toast.error(error, { id: "forget-password-error" });
      } else if (success) {
        toast.success(success, { id: "forget-password-success" });
        router.push("/login");
      }
    });
  };

  return (
    <CardWrapper
      backButtonHref="/login"
      backButtonLabel="Back To Login"
      headerLabel="Forget Password?"
      showFooter
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} autoFocus {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Enter your user account's verified email address and we will
                  send you a password reset link.
                </FormDescription>
              </FormItem>
            )}
          />
          <LoadingButton
            className="w-full"
            showIconOnly
            loading={isPending}
            type="submit"
          >
            Send Password Reset Link
          </LoadingButton>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default ForgetPasswordForm;

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
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "@/schema/PasswordResetSchema";
import CardWrapper from "../Global/CardWrapper";
import LoadingButton from "../ui/loading-button";

const PasswordResetForm = () => {
  const form = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {};
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
                  <Input autoFocus {...field} />
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
            loading={false}
            type="submit"
          >
            Send Password Reset Link
          </LoadingButton>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default PasswordResetForm;

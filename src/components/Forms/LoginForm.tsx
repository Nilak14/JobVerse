"use client";
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

import { Input } from "@/components/ui/input";
import { LoginSchemaType, LoginSchema } from "@/schema/LoginSchema";
import { Separator } from "../ui/separator";
import GoogleButton from "../Global/GoogleButton";
import Link from "next/link";
import { PasswordInput } from "../ui/password-input";
import LoadingButton from "../ui/loading-button";
import { useEffect, useState } from "react";
import RegisterModel from "../RegisterModel";
import { useAction } from "next-safe-action/hooks";
import { login } from "@/actions/auth/login";
import { toast } from "sonner";
import FormHeader from "./FormHeader";
import { useRouter } from "next/navigation";

import SendEmailVerificationModel from "../Global/SendEmailVerificationModel";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  error: string;
}
const LoginForm = ({ error }: LoginFormProps) => {
  const [open, setOpen] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      toast.error("Another account already exists with same e-mail address", {
        id: "login-error",
      });
      router.replace("/login", undefined);
    }
  }, [error, router]);
  useEffect(() => {
    if (authError) {
      toast.error(authError, { id: "login-error" });
    }
  }, [authError]);

  const { execute, status, isTransitioning } = useAction(login, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        if (data.error === "e") {
          toast.error("Your Email is not verified, Please Verify Your Email", {
            id: "login-error",
            position: "top-center",
          });

          setOpenEmailDialog(true);
        } else {
          setAuthError(data.error);
          setOpenEmailDialog(false);
        }
      } else if (data?.redirectLink) {
        router.replace(data.redirectLink);

        setAuthError(null);
      }
    },
    onError: () => {
      setAuthError("Something went wrong, Please try again later");
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    execute(data);
  };
  return (
    <>
      <article className=" mx-auto !max-w-[500px] w-full   px-4 pt-16 pb-6">
        <div className="text-left flex flex-col gap-3 mb-6">
          <FormHeader
            headingText="Welcome Back"
            supportingText="Nice to see you again! Please login to continue"
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white dark:bg-transparent"
                        disabled={status === "executing" || isTransitioning}
                        type="email"
                        placeholder="Your Email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        className="bg-white dark:bg-transparent"
                        disabled={status === "executing" || isTransitioning}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-right text-primary text-xs mt-2  ">
              <Link
                className={cn(
                  "group relative",
                  status === "executing" ||
                    (isTransitioning && "pointer-events-none")
                )}
                href="/forget-password"
              >
                Forgot Password?
                <div className="bg-primary w-0  h-[1px] group-hover:w-full transition-all duration-300 ease-in-out  block absolute right-0"></div>
              </Link>
            </div>

            <LoadingButton
              type="submit"
              className="w-full my-6"
              loading={status === "executing" || isTransitioning}
              disabled={status === "executing" || isTransitioning}
            >
              Login
            </LoadingButton>
          </form>
        </Form>
        <div className="my-6 flex justify-center gap-4 items-center overflow-hidden">
          <Separator className="bg-black dark:bg-border" />
          <span className="text-muted-foreground">or</span>
          <Separator className="bg-black dark:bg-border" />
        </div>
        <GoogleButton
          isDisabled={status === "executing" || isTransitioning}
          className="w-full "
        />
        <div className="text-center my-10 text-sm">
          <span>New To JobVerse? </span>
          <span
            onClick={() => setOpen(!open)}
            className={cn(
              " cursor-pointer text-primary relative group",
              status === "executing" ||
                (isTransitioning && "pointer-events-none")
            )}
          >
            Register Now
            <div className="bg-primary w-0  h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out  block absolute right-0"></div>
          </span>
        </div>
        <RegisterModel showFooter={false} open={open} setOpen={setOpen} />
      </article>

      <SendEmailVerificationModel
        open={openEmailDialog}
        setOpen={setOpenEmailDialog}
        userEmail={form.getValues("identifier")}
      />
    </>
  );
};
export default LoginForm;

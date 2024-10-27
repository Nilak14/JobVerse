"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { LoginSchemaType, LoginSchema } from "@/schema/LoginSchema";
import { Separator } from "../ui/separator";
import GoogleButton from "../Global/GoogleButton";
import Link from "next/link";
import { PasswordInput } from "../ui/password-input";
import LoadingButton from "../ui/loading-button";

const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };
  return (
    <>
      <article className=" mx-auto !max-w-[500px] w-full   px-4 pt-16 pb-6">
        <div className="text-left flex flex-col gap-3 mb-6">
          <h1 className="text-2xl font-bold tracking-wide">Welcome Back!</h1>
          <p className="text-muted-foreground font-medium tracking-wide">
            Nice to see you again! Please login to continue
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your Username or Email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your username or email
                    </FormDescription>
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
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-right text-primary text-xs mt-2  ">
              <Link className="group relative " href="/forgot-password">
                Forgot Password?
                <div className="bg-primary w-0  h-[1px] group-hover:w-full transition-all duration-300 ease-in-out  block absolute right-0"></div>
              </Link>
            </div>

            <LoadingButton
              type="submit"
              className="w-full my-6"
              loading={false}
            >
              Login
            </LoadingButton>
          </form>
        </Form>
        <div className="my-6 flex justify-center gap-4 items-center overflow-hidden">
          <Separator />
          <span className="text-muted-foreground">or</span>
          <Separator />
        </div>
        <GoogleButton className="w-full " />
        <div className="text-center my-10 text-sm">
          <span>New To JobVerse? </span>
          <Link className="text-primary relative group" href={"/register"}>
            Register Now
            <div className="bg-primary w-0  h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out  block absolute right-0"></div>
          </Link>
        </div>
      </article>
    </>
  );
};
export default LoginForm;

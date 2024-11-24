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
import { RegisterSchemaType, RegisterSchema } from "@/schema/RegisterSchema";
import { Separator } from "../ui/separator";
import GoogleButton from "../Global/GoogleButton";
import Link from "next/link";
import { PasswordInput } from "../ui/password-input";
import LoadingButton from "../ui/loading-button";
import { useAction } from "next-safe-action/hooks";
import { register } from "@/actions/auth/register";
import { toast } from "sonner";
import FormHeader from "./FormHeader";

const JobSeekerRegisterForm = () => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "JOB_SEEKER",
    },
    mode: "onChange",
  });

  const { execute, status } = useAction(register, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success, { id: "register" });
        form.reset();
      } else if (data?.error) {
        toast.error(data.error, { id: "register" });
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  const onSubmit = (data: RegisterSchemaType) => {
    execute(data);
  };

  return (
    <>
      <article className="mx-auto !max-w-[500px] w-full px-4 pt-16 pb-6">
        <div className="text-left flex flex-col gap-3 mb-6">
          <FormHeader
            headingText="Get Started!"
            supportingText="  Please register your details to continue"
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={status === "executing"}
                      placeholder={"Your Full Name"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={status === "executing"}
                      placeholder={"Your  Email Address"}
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
                      disabled={status === "executing"}
                      placeholder="Password"
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
                      disabled={status === "executing"}
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              className="w-full my-6"
              loading={status === "executing"}
              disabled={status === "executing"}
            >
              Create Account
            </LoadingButton>
          </form>
        </Form>
        <div className="text-right text-xs mt-3 font-semibold flex items-center justify-end gap-1">
          <span>Switch To </span>{" "}
          <Link href={"/register/company"}>
            <span className=" text-primary font-semibold tracking-wide relative group cursor-pointer">
              Register as Company
              <div className="bg-primary w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out block absolute right-0"></div>
            </span>
          </Link>
        </div>
        <div className="my-6 flex justify-center gap-4 items-center overflow-hidden">
          <Separator />
          <span className="text-muted-foreground">or</span>
          <Separator />
        </div>
        <GoogleButton userType="JOB_SEEKER" className="w-full" />
        <div className="text-center my-10 text-sm">
          <span>Already have an account? </span>
          <Link className="text-primary relative group" href={"/login"}>
            Sign In
            <div className="bg-primary w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out block absolute right-0"></div>
          </Link>
        </div>
      </article>
    </>
  );
};

export default JobSeekerRegisterForm;

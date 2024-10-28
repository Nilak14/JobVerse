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

interface RegisterFormProps {
  userType: "job-seeker" | "company";
}
const RegisterForm = ({ userType }: RegisterFormProps) => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType,
    },
    mode: "onChange",
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data);
  };

  return (
    <>
      <article className="mx-auto !max-w-[500px] w-full px-4 pt-16 pb-6">
        <div className="text-left flex flex-col gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
            Get Started!
          </h1>
          <p className="text-muted-foreground font-medium tracking-wide text-sm sm:text-base ">
            Please register your {userType === "company" && "company"} details
            to continue
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {userType === "company" ? "Company Name" : "Full Name"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        userType === "company"
                          ? "Your Company Name"
                          : "Your Full Name"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {userType === "company"
                      ? "This is your public company name."
                      : "This is your public display name."}
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
                  <FormLabel>
                    {userType === "company" ? "Company Email" : "Email"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        userType === "company"
                          ? "Your Company Email Address"
                          : "Your Email Address"
                      }
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
                    <PasswordInput placeholder="Password" {...field} />
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
              type="submit"
              className="w-full my-6"
              loading={false}
              disabled={!userType}
            >
              Create Account
            </LoadingButton>
          </form>
        </Form>
        <div className="text-right text-xs mt-2 font-semibold">
          <Link
            href={`/register?type=${userType === "company" ? "job-seeker" : "company"}`}
          >
            Switch To{" "}
            <span className=" text-primary font-semibold tracking-wide relative group  mt-2 cursor-pointer">
              Register as {userType === "company" ? "Job Seeker" : "Company"}
              <div className="bg-primary w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out block absolute right-0"></div>
            </span>
          </Link>
        </div>
        <div className="my-6 flex justify-center gap-4 items-center overflow-hidden">
          <Separator />
          <span className="text-muted-foreground">or</span>
          <Separator />
        </div>
        <GoogleButton className="w-full" />
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

export default RegisterForm;

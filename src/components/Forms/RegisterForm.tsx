"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterForm = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data);
  };

  const handleFocus = () => {
    if (!userType) {
      setShowError(true);
    }
  };

  return (
    <>
      <article className="mx-auto !max-w-[500px] w-full px-4 pt-16 pb-6">
        <div className="text-left flex flex-col gap-3 mb-6">
          <h1 className="text-2xl font-bold tracking-wide">Get Started!</h1>
          <p className="text-muted-foreground font-medium tracking-wide">
            Please register your details to continue
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="absolute right-10 top-5">
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setUserType(value);
                        setShowError(false);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Register as" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="seeker">Job Seeker</SelectItem>
                          <SelectItem value="company">
                            Company/Recruiter
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {showError && (
              <p className="text-red-500 text-sm">
                Please select a user type before filling out the form.
              </p>
            )}

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
                      onFocus={handleFocus}
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Email"
                      {...field}
                      onFocus={handleFocus}
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
                      placeholder="Password"
                      {...field}
                      onFocus={handleFocus}
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
                      placeholder="Confirm Password"
                      {...field}
                      onFocus={handleFocus}
                    />
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

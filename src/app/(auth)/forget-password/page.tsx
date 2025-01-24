import ForgetPasswordForm from "@/components/Forms/ForgetPasswordForm";
import { Logo } from "@/components/LandingPage/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
  description:
    "Reset your password easily and securely on our Forget Password page. Enter your email to receive password reset instructions.",
};
const ForgetPasswordPage = () => {
  return (
    <main className="flex flex-col gap-5 items-center justify-center h-dvh">
      <Logo fill="#e9590c" width="40" height="50" />
      <ForgetPasswordForm />
    </main>
  );
};
export default ForgetPasswordPage;

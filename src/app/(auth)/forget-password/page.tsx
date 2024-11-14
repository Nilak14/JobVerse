import ForgetPasswordForm from "@/components/Forms/ForgetPasswordForm";
import { Logo } from "@/components/LandingPage/NavBar";

const ForgetPasswordPage = () => {
  return (
    <main className="flex flex-col gap-5 items-center justify-center h-dvh">
      <Logo fill="#e9590c" width="40" height="50" />
      <ForgetPasswordForm />
    </main>
  );
};
export default ForgetPasswordPage;

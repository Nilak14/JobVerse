import PasswordResetForm from "@/components/Forms/PasswordResetForm";
import { Logo } from "@/components/LandingPage/NavBar";

const PasswordResetPage = () => {
  return (
    <main className="flex flex-col gap-5 items-center justify-center h-dvh">
      <Logo fill="#e9590c" width="40" height="50" />
      <PasswordResetForm />
    </main>
  );
};
export default PasswordResetPage;

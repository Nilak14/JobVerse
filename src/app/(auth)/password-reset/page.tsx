import PasswordResetForm from "@/components/Forms/PasswordResetForm";
import { Logo } from "@/components/LandingPage/NavBar";
import { redirect } from "next/navigation";

const PasswordResetPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { token } = await searchParams;
  if (!token) redirect("/login");

  return (
    <main className="flex flex-col gap-5 items-center justify-center h-dvh">
      <Logo fill="#e9590c" width="40" height="50" />
      <PasswordResetForm token={token as string} />
    </main>
  );
};
export default PasswordResetPage;

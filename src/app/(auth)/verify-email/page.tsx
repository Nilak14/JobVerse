import EmailVerificationForm from "@/components/Forms/EmailVerificationForm";
import { redirect } from "next/navigation";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { token } = await searchParams;
  if (!token) redirect("/login");
  return (
    <main className=" w-full  h-dvh flex items-center justify-center">
      <EmailVerificationForm token={token as string} />
    </main>
  );
};
export default VerifyEmailPage;

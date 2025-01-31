import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const JobLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.activeCompanyId ||
    !session.employerId
  ) {
    redirect("/");
  }
  return <>{children}</>;
};
export default JobLayout;

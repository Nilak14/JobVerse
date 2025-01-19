import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CompanyLayout = async ({ children }: { children: React.ReactNode }) => {
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
export default CompanyLayout;

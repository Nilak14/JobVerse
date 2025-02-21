import { auth } from "@/lib/auth";
import EmployerNav from "@/components/sidebar/EmployerNav";
import { redirect } from "next/navigation";

const NoSidebarLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <EmployerNav activeCompanyId={session.activeCompanyId} user={user} />
      <div className="relative flex min-h-[calc(100vh-4rem)]">{children}</div>
    </>
  );
};
export default NoSidebarLayout;

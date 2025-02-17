import { auth } from "@/lib/auth";
import EmployerNav from "@/components/sidebar/EmployerNav";
import { SidebarInset } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

const NoSidebarLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <SidebarInset>
        <EmployerNav activeCompanyId={session.activeCompanyId} user={user} />
        {children}
      </SidebarInset>
    </>
  );
};
export default NoSidebarLayout;

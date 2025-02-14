import { auth } from "@/lib/auth";
import EmployerNav from "@/components/sidebar/EmployerNav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
      {children}
    </>
  );
};
export default NoSidebarLayout;

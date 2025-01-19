import { auth } from "@/lib/auth";
import EmployerNav from "@/components/sidebar/EmployerNav";
import EmployerSidebar from "@/components/sidebar/EmployerSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

const EmployerSidebarLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.type !== "EMPLOYER") {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <EmployerSidebar
          activeCompanyId={session.activeCompanyId}
          user={user}
        />
        <SidebarInset>
          <div className="relative">
            <SidebarTrigger className="absolute top-1/2 translate-x-1/2 -translate-y-1/2" />
            <EmployerNav
              activeCompanyId={session.activeCompanyId}
              user={user}
              hasSidebar
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
export default EmployerSidebarLayout;

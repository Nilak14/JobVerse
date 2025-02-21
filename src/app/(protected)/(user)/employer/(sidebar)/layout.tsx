import { auth } from "@/lib/auth";
import EmployerNav from "@/components/sidebar/EmployerNav";
import EmployerSidebar from "@/components/sidebar/EmployerSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import SidebarPageTransition from "@/context/SidebarPageTransition";
import SidebarContainer from "@/components/Global/SidebarContainer";

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
      <EmployerSidebar activeCompanyId={session.activeCompanyId} user={user} />
      <SidebarInset>
        <EmployerNav
          activeCompanyId={session.activeCompanyId}
          user={user}
          hasSidebar
        />

        <div className="flex flex-1 flex-col gap-4 p-4">
          <SidebarPageTransition>
            <SidebarContainer>{children}</SidebarContainer>
          </SidebarPageTransition>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default EmployerSidebarLayout;

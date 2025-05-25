import { auth } from "@/lib/auth";
import AdminNav from "@/components/sidebar/AdminNav";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import SidebarContainer from "@/components/Global/SidebarContainer";
import SidebarPageTransition from "@/context/SidebarPageTransition";

const AdminSidebarLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  if (user.type !== "ADMIN") {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <SidebarInset>
        <AdminNav user={user} hasSidebar />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SidebarPageTransition>
            <SidebarContainer>{children}</SidebarContainer>
          </SidebarPageTransition>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AdminSidebarLayout;

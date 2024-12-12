import { auth } from "@/lib/auth";
import AdminNav from "@/components/sidebar/AdminNav";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

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
      <div className="flex w-full h-screen">
        <AdminSidebar user={user} />
        <SidebarInset>
          <div className="relative">
            <SidebarTrigger className="absolute top-1/2 translate-x-1/2 -translate-y-1/2" />
            <AdminNav user={user} hasSidebar />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
export default AdminSidebarLayout;

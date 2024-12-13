import { auth } from "@/lib/auth";

import AdminNav from "@/components/sidebar/AdminNav";
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
      <SidebarProvider>
        <SidebarInset>
          <AdminNav user={user} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
export default NoSidebarLayout;

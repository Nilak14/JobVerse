import { auth } from "@/auth";
import CompanyNav from "@/components/sidebar/CompanyNav";
import CompanySidebar from "@/components/sidebar/CompanySidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

const CompanySidebarLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <CompanySidebar user={user} />
        <SidebarInset>
          <div className="relative">
            <SidebarTrigger className="absolute top-1/2 translate-x-1/2 -translate-y-1/2" />
            <CompanyNav user={user} hasSidebar />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
export default CompanySidebarLayout;

import { auth } from "@/lib/auth";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
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
          <JobSeekerNav user={user} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
export default NoSidebarLayout;

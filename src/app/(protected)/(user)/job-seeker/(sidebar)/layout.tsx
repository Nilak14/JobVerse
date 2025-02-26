import { auth } from "@/lib/auth";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
import JobSeekerSidebar from "@/components/sidebar/JobSeekerSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import SidebarContainer from "@/components/Global/SidebarContainer";
import SidebarPageTransition from "@/context/SidebarPageTransition";

const JObSeekerSidebarLayout = async ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <JobSeekerSidebar user={user} />
      <SidebarInset>
        <JobSeekerNav hasSidebar user={user} />

        <main className="flex flex-1 flex-col gap-4 p-4">
          <SidebarPageTransition>
            <SidebarContainer>{children}</SidebarContainer>
          </SidebarPageTransition>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default JObSeekerSidebarLayout;

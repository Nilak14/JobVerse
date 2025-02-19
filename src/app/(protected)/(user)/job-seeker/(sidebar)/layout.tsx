import { auth } from "@/lib/auth";
import ThemeSelect from "@/components/Global/ThemeSelect";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
import JobSeekerSidebar from "@/components/sidebar/JobSeekerSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import SidebarContainer from "@/components/Global/SidebarContainer";

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
      <div className="flex  h-screen w-full">
        <JobSeekerSidebar user={user} />
        <SidebarInset>
          <div className="relative ">
            <SidebarTrigger className="absolute top-1/2 translate-x-1/2 -translate-y-1/2 z-[100]" />
            <JobSeekerNav user={user} hasSidebar />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
            <SidebarContainer>{children}</SidebarContainer>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
export default JObSeekerSidebarLayout;

import { auth } from "@/auth";
import ThemeSelect from "@/components/Global/ThemeSelect";
import JobSeekerSidebar from "@/components/sidebar/JobSeekerSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

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
          <header className="flex   h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar shadow-sm shadow-muted-foreground">
            <section className="flex w-full justify-between  items-center gap-2 px-4">
              <div>
                <SidebarTrigger className="-ml-1" />
              </div>
              <div>
                <ThemeSelect />
              </div>
            </section>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
export default JObSeekerSidebarLayout;

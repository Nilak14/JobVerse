import { auth } from "@/lib/auth";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
import { redirect } from "next/navigation";

const NoSidebarLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <div className="flex flex-1 items-center justify-center gap-2 h-16 px-3  border-b border-muted-foreground/40">
        <JobSeekerNav user={user} />
      </div>
      <div>{children}</div>
    </>
  );
};
export default NoSidebarLayout;

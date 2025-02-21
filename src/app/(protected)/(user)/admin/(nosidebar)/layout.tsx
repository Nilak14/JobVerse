import { auth } from "@/lib/auth";

import AdminNav from "@/components/sidebar/AdminNav";
import { redirect } from "next/navigation";

const NoSidebarLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <AdminNav user={user} />
      <div className="relative flex min-h-[calc(100vh-4rem)]">{children}</div>
    </>
  );
};
export default NoSidebarLayout;

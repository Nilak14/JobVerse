import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.type !== "EMPLOYER") {
    redirect("/login");
  }
  const isInOrganization = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      EMPLOYER: {
        include: {
          organizations: true,
        },
      },
    },
  });
  console.log(isInOrganization);

  return <>{children}</>;
};
export default layout;

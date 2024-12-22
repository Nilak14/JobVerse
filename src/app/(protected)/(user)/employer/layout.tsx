import InvitationsModal from "@/components/InvitationsModal";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.type !== "EMPLOYER") {
    redirect("/login");
  }
  const employer = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      EMPLOYER: {
        include: {
          companies: true,
        },
      },
    },
  });

  const isOnCompany = employer?.EMPLOYER?.companies.length;
  if (!isOnCompany) {
    redirect("/onboarding/employer");
  }
  return (
    <>
      {children}
      <InvitationsModal user={user} />
    </>
  );
};
export default layout;

import { setActiveCompany } from "@/actions/companies/setActiveCompany";
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

  const userE = await prisma.user.findFirst({
    where: { id: user.id },
    include: {
      EMPLOYER: {
        include: {
          companyMemberships: {
            where: {
              isDeleted: false,
            },
          },
        },
      },
    },
  });

  const isOnCompany = userE?.EMPLOYER?.companyMemberships.length;
  if (!isOnCompany) {
    redirect("/onboarding/employer");
  }

  if (!session.activeCompanyId) {
    await setActiveCompany();
  }

  return (
    <>
      {children}
      <InvitationsModal user={user} />
    </>
  );
};
export default layout;

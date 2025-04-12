import { signOut } from "@/auth";
import SidebarContainer from "@/components/Global/SidebarContainer";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCompanyInclude } from "@/lib/prisma-types/Company";
import { redirect } from "next/navigation";
import { cache } from "react";
import DangerZone from "@/components/Company/settings/DangerZone";
import CompanyProfileUpdate from "@/components/Company/settings/CompanyProfileUpdate";
import { Metadata } from "next";
import CompanyIntegration from "@/components/Company/settings/CompanyIntegration";

const getActiveCompany = cache(
  async (companyId: string, employerId: string) => {
    const activeCompany = await prisma.company.findUnique({
      where: {
        id: companyId,
        isDeleted: false,
      },
      include: getCompanyInclude(employerId),
    });
    return activeCompany;
  }
);

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await auth();
  if (!session || !session.user || !session.activeCompanyId) return {};
  const activeCompany = await getActiveCompany(
    session.activeCompanyId,
    session.employerId!
  );
  return {
    title: `${activeCompany?.name} Settings` || "",
    description: "Company Settings",
    openGraph: {
      images: [{ url: activeCompany?.logoUrl || "" }],
    },
  };
};
const CompanySettingsPage = async () => {
  const session = await auth();

  if (
    !session ||
    !session.user ||
    !session.activeCompanyId ||
    !session.employerId
  ) {
    redirect("/");
  }
  const activeCompany = await getActiveCompany(
    session.activeCompanyId,
    session.employerId!
  );
  if (!activeCompany) {
    signOut();
    return;
  }

  return (
    <SidebarContainer className="space-y-10">
      <CompanyProfileUpdate session={session} activeCompany={activeCompany} />
      <CompanyIntegration session={session} activeCompany={activeCompany} />

      <DangerZone session={session} activeCompany={activeCompany} />
    </SidebarContainer>
  );
};
export default CompanySettingsPage;

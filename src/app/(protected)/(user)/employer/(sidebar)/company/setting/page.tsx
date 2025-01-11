import { signOut } from "@/auth";
import DeleteCompanyButton from "@/components/DeleteCompanyButton";
import SidebarContainer from "@/components/Global/SidebarContainer";
import LeaveCompanyButton from "@/components/LeaveCompanyButton";
import RemoveCompanyMembersButton from "@/components/RemoveCompanyMembersButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCompanyInclude } from "@/lib/prisma-types/Company";
import { redirect } from "next/navigation";
import { cache } from "react";

const getActiveCompany = cache(
  async (companyId: string, employerId: string) => {
    const activeCompany = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: getCompanyInclude(employerId),
    });
    return activeCompany;
  }
);

export const generateMetadata = async () => {
  const session = await auth();
  if (!session || !session.user || !session.activeCompanyId) return {};
  const activeCompany = await getActiveCompany(
    session.activeCompanyId,
    session.employerId!
  );
  return {
    title: `${activeCompany?.name} Settings` || "",
    description: "Company Settings",
  };
};
const CompanySettingsPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.activeCompanyId) {
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
    <SidebarContainer>
      <h2 className="text-xl mb-5">Danger Zone</h2>
      <Card className="border-destructive border-[0.5px]">
        <CardHeader className="sr-only">
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Danger Zone, this section contains buttons to delete or leave
            company
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5">
          <section className="space-y-5">
            {session.user.id === activeCompany.adminEmployer.userId ? (
              <>
                <div className="flex lg:items-center items-start justify-between lg:flex-row flex-col gap-5">
                  <div>
                    <p>Remove Members</p>
                    <p className="text-muted-foreground text-sm block  ">
                      Removing members will remove them from this company. They
                      will lose access to all the data associated with this
                      company.
                    </p>
                  </div>
                  <div className="w-full lg:w-auto">
                    <RemoveCompanyMembersButton
                      user={session.user}
                      activeCompany={activeCompany}
                    />
                  </div>
                </div>
                <Separator className="border-2" />
                <div className="flex lg:items-center items-start justify-between lg:flex-row flex-col gap-5">
                  <div>
                    <p>
                      Delete This Company{" "}
                      <span className="text-primary">
                        ({activeCompany.name})
                      </span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Deleting this company will delete all the data associated
                      with this company. This action is irreversible.
                    </p>
                  </div>
                  <div className="w-full lg:w-auto">
                    <DeleteCompanyButton activeCompany={activeCompany} />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex lg:items-center items-start justify-between lg:flex-row flex-col gap-5">
                <div>
                  <p>
                    Leave This Company{" "}
                    <span className="text-primary">({activeCompany.name})</span>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Leaving this company will remove you from this company. You
                    will lose access to all the data associated with this
                    company.
                  </p>
                </div>
                <div className="w-full lg:w-auto">
                  <LeaveCompanyButton
                    activeCompany={activeCompany}
                    user={session.user}
                  />
                </div>
              </div>
            )}
          </section>
        </CardContent>
      </Card>
    </SidebarContainer>
  );
};
export default CompanySettingsPage;

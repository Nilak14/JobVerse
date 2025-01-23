import RemoveCompanyMembersButton from "@/components/Company/RemoveCompanyMembersButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import DeleteCompanyButton from "@/components/Company/DeleteCompanyButton";
import LeaveCompanyButton from "@/components/Company/LeaveCompanyButton";
import { Session } from "next-auth";
import CompanySettingsHeader from "@/components/Company/settings/CompanySettingsHeader";

interface DangerZoneProps {
  session: Session;
  activeCompany: CompanyInclude;
}

const DangerZone = ({ session, activeCompany }: DangerZoneProps) => {
  return (
    <div>
      <CompanySettingsHeader
        title="Danger Zone"
        description="Irreversible and destructive actions"
      />
      <Card className="border-destructive border-[0.5px]">
        <CardHeader className="sr-only">
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
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
                      session={session}
                      activeCompany={activeCompany}
                    />
                  </div>
                </div>
                <Separator className="border" />
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
                    <DeleteCompanyButton
                      session={session}
                      activeCompany={activeCompany}
                    />
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
                    session={session}
                  />
                </div>
              </div>
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  );
};
export default DangerZone;

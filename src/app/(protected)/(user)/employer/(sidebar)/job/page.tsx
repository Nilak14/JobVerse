import { companyJobsColumn } from "@/columns/company-jobs-column";
import SidebarContainer from "@/components/Global/SidebarContainer";
import PostJobButton from "@/components/Job/PostJobButton";
import EmployerJobTable from "@/components/Table/EmployerJobTable";
import { getAllCompanyJobs } from "@/data-access/job/getAllCompanyJobs";
import { getCompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";
import { auth } from "@/lib/auth";
import { canPostJob } from "@/lib/permissions/company-permissions";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Job Studio",
  description: "This page shows all the jobs posted in your company",
};

const JobListPage = async () => {
  const session = await auth();
  if (!session || !session.activeCompanyId) {
    redirect("/");
  }
  const jobs = await getAllCompanyJobs(session.activeCompanyId);
  const subscriptionLevel = await getCompanySubscriptionLevel(
    session.activeCompanyId
  );
  return (
    <SidebarContainer>
      <section className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-end items-end">
          <PostJobButton
            canCreate={canPostJob(subscriptionLevel, jobs.length)}
          />
        </div>

        <EmployerJobTable columns={companyJobsColumn} data={jobs || []} />
      </section>
    </SidebarContainer>
  );
};
export default JobListPage;

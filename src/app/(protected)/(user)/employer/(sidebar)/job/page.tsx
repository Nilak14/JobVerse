import { companyJobsColumn } from "@/columns/company-jobs-column";
import SidebarContainer from "@/components/Global/SidebarContainer";
import EmployerJobTable from "@/components/Table/EmployerJobTable";
import JobCard from "@/components/TableCard/JobTableCard";
import { Button } from "@/components/ui/button";
import { getAllCompanyJobs } from "@/data-access/job/getAllCompanyJobs";
import { auth } from "@/lib/auth";
import { BriefcaseMedical } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 *
 * maxAmount: upto Rs. 20000
 * startingAmount: from Rs. 20000
 * range: Rs. 20000 - Rs. 40000
 * exact: Rs. 20000
 */

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

  return (
    <SidebarContainer>
      <section className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-end items-end">
          <Button asChild>
            <Link href={"/employer/job-studio"}>
              <BriefcaseMedical />
              Post New Job
            </Link>
          </Button>
        </div>

        {/* table for larger screens */}
        <div className="hidden lg:block">
          <EmployerJobTable
            searchColumn={"title"}
            searchPlaceholder="Search Jobs By Title..."
            columns={companyJobsColumn}
            data={jobs || []}
          />
        </div>
        {/* card for smaller screens */}

        <div className="lg:hidden grid grid-cols-1 gap-4  lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={job.id} jobData={job} />
          ))}
        </div>
      </section>
    </SidebarContainer>
  );
};
export default JobListPage;

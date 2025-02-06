import SidebarContainer from "@/components/Global/SidebarContainer";
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
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div key={job.id}>
              <p>{job.title}</p>
              <p>{job.status}</p>
              <p>{job.workMode}</p>
              <Button asChild>
                <Link href={`/employer/job-studio/?jobId=${job.id}`}>Edit</Link>
              </Button>
            </div>
          ))}
        </div>
        {/* <JVTableClient
          searchColumn={"name"}
          searchPlaceholder="Search User..."
          columns={companyEmployerColumns}
          data={data || []}
        /> */}
      </section>
    </SidebarContainer>
  );
};
export default JobListPage;

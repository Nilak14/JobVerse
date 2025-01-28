import SidebarContainer from "@/components/Global/SidebarContainer";
import { Button } from "@/components/ui/button";
import { BriefcaseMedical } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

/**
 *
 * maxAmount: upto Rs. 20000
 * startingAmount: from Rs. 20000
 * range: Rs. 20000 - Rs. 40000
 * exact: Rs. 20000
 */

export const metadata: Metadata = {
  title: "Job Studio",
  description:
    "This page shows all the members who the jobs posted in your company",
};

const JobListPage = () => {
  return (
    <SidebarContainer>
      <section className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-end items-end">
          <Button asChild>
            <Link href={"/employer/create-job"}>
              <BriefcaseMedical />
              Post New Job
            </Link>
          </Button>
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

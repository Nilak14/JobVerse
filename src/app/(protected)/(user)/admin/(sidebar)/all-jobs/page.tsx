import { AdminAllJobsColumn } from "@/columns/admin-jobs-column";
import AdminAllJobTable from "@/components/Table/AdminAllJobTable";
import { getAllJobs } from "@/data-access/admin-access/jobs/getAllJobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Jobs",
  description: "All Jobs",
};
const AllJobs = async () => {
  const jobs = await getAllJobs();

  return (
    <>
      <div>
        <AdminAllJobTable data={jobs} columns={AdminAllJobsColumn} />
      </div>
    </>
  );
};
export default AllJobs;

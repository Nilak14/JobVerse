import { Metadata } from "next";
import JobEditorPage from "./JobEditorPage";
import { getJobById } from "@/data-access/job/getJobById";
import { auth } from "@/lib/auth";

interface PageProps {
  searchParams: Promise<{ jobId?: string }>;
}
export const metadata: Metadata = {
  title: "Create Job",
  description: "Create a new job posting to attract the best candidates",
};

const Page = async ({ searchParams }: PageProps) => {
  const session = await auth();
  if (!session || !session.activeCompanyId) {
    return null;
  }
  const { jobId } = await searchParams;
  const jobToEdit = jobId ? await getJobById(jobId) : null;

  return <JobEditorPage jobToEdit={jobToEdit} />;
};
export default Page;

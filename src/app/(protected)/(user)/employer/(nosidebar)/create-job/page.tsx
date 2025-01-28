import Container from "@/components/Global/Container";
import JobCreateForm from "@/components/Job/JobCreateForm";
import JobCreatePreview from "@/components/Job/JobCreatePreview";
import { Metadata } from "next";
import CreateJobPage from "./CreateJobPage";

export const metadata: Metadata = {
  title: "Create Job",
  description: "Create a new job posting to attract the best candidates",
};

const Page = () => {
  return <CreateJobPage />;
};
export default Page;

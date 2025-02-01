import { Metadata } from "next";
import JobEditorPage from "./JobEditorPage";

export const metadata: Metadata = {
  title: "Create Job",
  description: "Create a new job posting to attract the best candidates",
};

const Page = () => {
  return <JobEditorPage />;
};
export default Page;

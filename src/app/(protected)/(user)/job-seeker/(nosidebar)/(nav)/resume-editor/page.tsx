import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { getResumeById } from "@/data-access/resume/getResumeById";

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
  description: "Create and design your resume",
};
const ResumeEditorPage = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;
  const resumeToEdit = id ? await getResumeById(id) : null;
  return <ResumeEditor resumeToEdit={resumeToEdit} />;
};
export default ResumeEditorPage;

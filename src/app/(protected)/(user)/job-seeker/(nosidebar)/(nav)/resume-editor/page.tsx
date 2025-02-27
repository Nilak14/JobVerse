import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { getResumeById } from "@/data-access/resume/getResumeById";
import { getJobSeekerProfile } from "@/data-access/job-seeker/jobSeekerProfile";

interface PageProps {
  searchParams: Promise<{ id?: string; profileData?: boolean }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
  description: "Create and design your resume",
};
const ResumeEditorPage = async ({ searchParams }: PageProps) => {
  const { id, profileData } = await searchParams;
  const resumeToEdit = id ? await getResumeById(id) : null;
  const jobSeekerProfile = profileData ? await getJobSeekerProfile() : null;

  return (
    <ResumeEditor
      jobSeekerProfile={jobSeekerProfile}
      resumeToEdit={resumeToEdit}
    />
  );
};
export default ResumeEditorPage;

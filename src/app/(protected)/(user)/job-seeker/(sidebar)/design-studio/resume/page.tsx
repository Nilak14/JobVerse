import CreatedResumeCard from "@/components/Resume/CreatedResumeCard";
import { Button } from "@/components/ui/button";
import { getUserAllCreatedResume } from "@/data-access/resume/getUserAllCreatedResume";
import { auth } from "@/lib/auth";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Resumes",
  description: "Create and manage your resumes",
};
const ResumeStudioPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.jobSeekerId) {
    return null;
  }
  const [resumes, resumeCount] = await getUserAllCreatedResume(
    session.jobSeekerId
  );
  return (
    <section>
      <Button asChild>
        <Link href={"/job-seeker/resume-editor"}>
          <PlusSquare className="size-5" />
          New Resume
        </Link>
      </Button>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Resume Count</h1>
        <p>Total:{resumeCount}</p>
      </div>
      <div className=" w-full gap-3 flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <CreatedResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </section>
  );
};
export default ResumeStudioPage;

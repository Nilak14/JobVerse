import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Resumes",
  description: "Create and manage your resumes",
};
const ResumeStudioPage = () => {
  return (
    <section>
      <Button asChild>
        <Link href={"/job-seeker/resume-editor"}>
          <PlusSquare className="size-5" />
          New Resume
        </Link>
      </Button>
    </section>
  );
};
export default ResumeStudioPage;

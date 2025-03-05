import ResumePreview from "@/components/Resume/ResumePreview";
import { getResumeById } from "@/data-access/resume/getResumeById";
import { mapToResumeValues } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params; // slug is resume id here
  const resume = await getResumeById(slug);
  if (!resume) {
    return {};
  }
  return {
    title: `${resume.fullName} Resume`,
    description: `${resume.description}`,
  };
};
const UserResume = async ({ params }: PageProps) => {
  const { slug } = await params; // slug is resume id here
  const resume = await getResumeById(slug);
  if (!resume) return notFound();
  return (
    <div className="max-w-[745px] mx-auto my-10">
      <ResumePreview
        className="shadow-sm group-hover:shadow-lg transition-shadow overflow-hidden"
        resumeDate={mapToResumeValues(resume)}
      />
    </div>
  );
};
export default UserResume;

import Container from "@/components/Global/Container";
import Notification from "@/components/Global/Notification";
import { Logo } from "@/components/LandingPage/NavBar";
import { getJobByIdDescription } from "@/data-access/job/getJobForDescriptionById";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDescriptionPageContent from "./JobDescriptionPage";
import { Suspense } from "react";
import JobDescriptionPageSkeleton from "@/components/skeletons/JobDescriptionPageSkeleton";
import NavLogo from "@/components/Global/NavLogo";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
import { auth } from "@/lib/auth";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params; // slug is job id here
  const job = await getJobByIdDescription(slug);
  if (!job) {
    return {};
  }
  return {
    title: `${job.title} at ${job.company.name}`,
    description: job.description,
  };
};

const JobDescriptionPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const session = await auth();
  const job = await getJobByIdDescription(slug);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  } as const;
  if (!job) {
    notFound();
  }

  return (
    <div>
      <JobSeekerNav user={null} hasSidebar={false} />
      <Suspense fallback={<JobDescriptionPageSkeleton />}>
        <JobDescriptionPageContent
          session={session}
          containerVariants={containerVariants}
          itemVariant={itemVariant}
          job={job}
        />
      </Suspense>
    </div>
  );
};
export default JobDescriptionPage;

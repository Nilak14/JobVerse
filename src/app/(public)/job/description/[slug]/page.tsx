import { getJobByIdDescription } from "@/data-access/job/getJobForDescriptionById";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDescriptionPageContent from "./JobDescriptionPage";
import { Suspense } from "react";
import JobDescriptionPageSkeleton from "@/components/skeletons/JobDescriptionPageSkeleton";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import NavBar from "@/components/LandingPage/NavBar";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

const fetchJobData = async (slug: string) => {
  const job = await getJobByIdDescription(slug);
  if (!job) {
    notFound();
  }
  return job;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params; // slug is job id here
  const job = await fetchJobData(slug);
  if (!job) {
    return {};
  }
  return {
    title: `${job.title} at ${job.company.name}`,
    description: job.description,
  };
};
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

const JobDescriptionPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const session = await auth();

  return (
    <>
      {session ? <JobSeekerNav user={null} hasSidebar={false} /> : <NavBar />}

      <Suspense fallback={<JobDescriptionPageSkeleton />}>
        <JobDescriptionContent slug={slug} session={session} />
      </Suspense>
    </>
  );
};
export default JobDescriptionPage;

const JobDescriptionContent = async ({
  slug,
  session,
}: {
  slug: string;
  session: Session | null;
}) => {
  const job = await fetchJobData(slug);
  return (
    <JobDescriptionPageContent
      session={session}
      containerVariants={containerVariants}
      itemVariant={itemVariant}
      job={job}
    />
  );
};

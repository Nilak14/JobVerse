import Container from "@/components/Global/Container";
import Notification from "@/components/Global/Notification";
import { Logo } from "@/components/LandingPage/NavBar";
import { getJobByIdDescription } from "@/data-access/job/getJobForDescriptionById";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDescriptionPageContent from "./JobDescriptionPage";
import { Suspense } from "react";
import JobDescriptionPageSkeleton from "@/components/skeletons/JobDescriptionPageSkeleton";
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
      <Container className="flex h-16 shrink-0 items-center gap-2  bg-sidebar sticky top-0 z-50">
        <section className="flex-1  h-full flex items-center">
          <Logo showText={false} fill="#e9590c" height="40" width="40" />
        </section>
        <section className="flex-1  h-full flex items-center justify-end gap-10 ">
          <div className="">
            <Notification />
          </div>

          <div>{/* <NavUser user={user} isLoading={!user} /> */}</div>
        </section>
      </Container>
      <Suspense fallback={<JobDescriptionPageSkeleton />}>
        <JobDescriptionPageContent
          containerVariants={containerVariants}
          itemVariant={itemVariant}
          job={job}
        />
      </Suspense>
    </div>
  );
};
export default JobDescriptionPage;

import { Metadata } from "next";
import BrowsePage from "./BrowsePage";
import { auth } from "@/lib/auth";
import BrowsePageTop from "./BrowsePageTop";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Browse Jobs",
  description:
    "Explore a wide range of job opportunities tailored to your skills and preferences. Find your next career move with ease.",
};

const JobBrowsePage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.jobSeekerId) {
    return null;
  }
  const jobseeker = await prisma.jobSeekerProfile.findUnique({
    where: {
      userId: session.jobSeekerId,
    },
    select: {
      showNearByJobs: true,
    },
  });
  console.log("jobseeker", jobseeker);
  const showNearByJobs = jobseeker?.showNearByJobs ?? false;
  return (
    <div>
      <header className="sticky top-0 z-20  overflow-hidden">
        <BrowsePageTop user={session.user} />
      </header>
      <BrowsePage showNearByJobs={showNearByJobs} session={session} />;
    </div>
  );
};
export default JobBrowsePage;

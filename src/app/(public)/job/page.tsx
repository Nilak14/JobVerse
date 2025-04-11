import BrowsePage from "@/app/(protected)/(user)/job-seeker/(nosidebar)/(custom-nav)/browse/jobs/BrowsePage";

import NavBar from "@/components/LandingPage/NavBar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const JobPage = async () => {
  const session = await auth();
  let user;
  if (session && session.jobSeekerId) {
    user = await prisma.jobSeekerProfile.findUnique({
      where: {
        userId: session.jobSeekerId,
      },
      select: {
        showNearByJobs: true,
      },
    });
  }
  const showNearByJobs = user?.showNearByJobs ?? false;
  return (
    <div>
      <NavBar />
      <BrowsePage
        showNearByJobs={showNearByJobs}
        showBackButton={false}
        session={session}
      />
    </div>
  );
};
export default JobPage;

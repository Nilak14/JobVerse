import BrowsePage from "@/app/(protected)/(user)/job-seeker/(nosidebar)/(custom-nav)/browse/jobs/BrowsePage";

import NavBar from "@/components/LandingPage/NavBar";
import { auth } from "@/lib/auth";

const JobPage = async () => {
  const session = await auth();
  return (
    <div>
      <NavBar />
      <BrowsePage showBackButton={false} session={session} />
    </div>
  );
};
export default JobPage;

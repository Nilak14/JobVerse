import ApplicationStatusDistributionPie from "@/components/JobSeeker/Dashboard/ApplicationStatusDistributionPie";
import RecommendedJob from "@/components/JobSeeker/Dashboard/RecommendedJob";
import TopCard from "@/components/JobSeeker/Dashboard/TopCard";
import ScheduledInterview from "@/components/JobSeeker/Dashboard/UpcomingInterview";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard For JobSeeker",
};
const DashboardPage = async () => {
  const session = await auth();
  if (!session || !session.jobSeekerId) {
    return null;
  }
  return (
    <div className="w-full space-y-5">
      <TopCard />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <ScheduledInterview jobseekerId={session.jobSeekerId} />
        <ApplicationStatusDistributionPie />
      </div>
      <div>
        <RecommendedJob jobseekerId={session.jobSeekerId} />
      </div>
    </div>
  );
};
export default DashboardPage;

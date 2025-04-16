import ApplicationStatusDistributionPie from "@/components/employer/dashboard/ApplicationStatusDistributionPie";
import ApplicationTrends from "@/components/employer/dashboard/ApplicationTrend";
import RecentPendingApplicant from "@/components/employer/dashboard/RecentPendingApplicant";
import ScheduledInterview from "@/components/employer/dashboard/ScheduledInterview";
import TopCard from "@/components/employer/dashboard/TopCard";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard For Employer",
};
const EmployerDashboardPage = async () => {
  const session = await auth();
  if (!session || !session.activeCompanyId) {
    return redirect("/");
  }
  return (
    <div className="w-full space-y-5">
      <TopCard companyId={session.activeCompanyId} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <ApplicationTrends companyId={session.activeCompanyId} />
        <ApplicationStatusDistributionPie companyId={session.activeCompanyId} />
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <ScheduledInterview companyId={session.activeCompanyId} />
        <RecentPendingApplicant companyId={session.activeCompanyId} />
      </div>
    </div>
  );
};
export default EmployerDashboardPage;

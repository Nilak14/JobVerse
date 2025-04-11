import HighestJobCompany from "@/components/adminDashboard/HighestJobCompany";
import OverviewCard from "@/components/adminDashboard/OverviewCard";
import RecentUser from "@/components/adminDashboard/RecentUser";
import UserDistributionPie from "@/components/adminDashboard/UserDistributionPie";
import UserRegistrationTrends from "@/components/adminDashboard/UserRegistrationTrends";

const Overview = () => {
  return (
    <div className="w-full space-y-5">
      <OverviewCard />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <UserRegistrationTrends />
        <UserDistributionPie />
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <RecentUser />
        <HighestJobCompany />
      </div>
    </div>
  );
};
export default Overview;

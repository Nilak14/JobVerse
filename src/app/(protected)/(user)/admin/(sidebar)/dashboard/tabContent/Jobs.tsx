import JobAnalyticsCard from "@/components/adminDashboard/JobAnalyticsCard";
import JobPostingTrends from "@/components/adminDashboard/JobPostingRegistrationTrends";
import JobsByCategoryBar from "@/components/adminDashboard/JobsByCategoryBar";

const Jobs = () => {
  return (
    <div className="w-full space-y-5">
      <JobAnalyticsCard />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <JobPostingTrends />
        <JobsByCategoryBar />
      </div>
    </div>
  );
};
export default Jobs;

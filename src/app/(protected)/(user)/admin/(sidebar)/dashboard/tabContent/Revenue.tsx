import EmployerRevenuePie from "@/components/adminDashboard/EmployerRevenuePie";
import JobSeekerRevenuePie from "@/components/adminDashboard/JobSeekerRevenuePie";

import SubscriptionTrend from "@/components/adminDashboard/SubscriptionTrend";

const Revenue = () => {
  return (
    <div className="space-y-4 mt-10">
      <div>
        <h2 className="text-lg font-semibold">Job Seeker Revenue</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This chart shows the distribution of job seekers and company based on
          their subscription plans.
        </p>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <JobSeekerRevenuePie />
          <EmployerRevenuePie />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <SubscriptionTrend />
      </div>
    </div>
  );
};
export default Revenue;

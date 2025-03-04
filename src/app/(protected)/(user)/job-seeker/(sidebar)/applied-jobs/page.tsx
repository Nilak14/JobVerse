import JobApplicationStatsSkeleton from "@/components/skeletons/JobApplicationStatsApplication";
import BoxReveal from "@/components/ui/box-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  getJobApplicationForCount,
  getJobSeekerAllApplication,
} from "@/data-access/application/getJobSeekerApplication";
import { Suspense } from "react";
import ApplicationDataTab from "@/components/applications/ApplicationDataTab";
import ApplicationDataTabSkeleton from "@/components/skeletons/ApplicationDataTabSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications",
  description: " Track and manage your job applications in one place",
};

const JobAppliedPage = () => {
  return (
    <main>
      <section className="space-y-10">
        <BoxReveal>
          <div className="space-y-3">
            <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
              Job Applications
            </h1>
            <p className="text-sm text-muted-foreground  tracking-wide">
              Track and manage your job applications in one place
            </p>
          </div>
        </BoxReveal>
        <Suspense fallback={<JobApplicationStatsSkeleton />}>
          <JobApplicationStats />
        </Suspense>
        <Suspense fallback={<ApplicationDataTabSkeleton />}>
          <JobApplicationDataSection />
        </Suspense>
      </section>
    </main>
  );
};
export default JobAppliedPage;

const JobApplicationDataSection = async () => {
  const application = await getJobSeekerAllApplication();
  //   if(!applications) return null
  const pendingJobCount =
    application?.filter((app) => app.status === "PENDING").length || 0;
  const rejectedJobCount =
    application?.filter((app) => app.status === "REJECTED").length || 0;
  const acceptedJobCount =
    application?.filter((app) => app.status === "APPROVED").length || 0;
  const interviewJobCount =
    application?.filter((app) => app.status === "INTERVIEW").length || 0;
  const totalJobCount = application?.length || 0;

  return (
    <ApplicationDataTab
      acceptedJobCount={acceptedJobCount}
      application={application}
      interviewJobCount={interviewJobCount}
      pendingJobCount={pendingJobCount}
      rejectedJobCount={rejectedJobCount}
      totalJobCount={totalJobCount}
    />
  );
};
const JobApplicationStats = async () => {
  const application = await getJobApplicationForCount();
  const pendingJobCount =
    application?.filter((app) => app.status === "PENDING").length || 0;
  const rejectedJobCount =
    application?.filter((app) => app.status === "REJECTED").length || 0;
  const acceptedJobCount =
    application?.filter((app) => app.status === "APPROVED").length || 0;
  const interviewJobCount =
    application?.filter((app) => app.status === "INTERVIEW").length || 0;
  const totalJobCount = application?.length || 0;

  const successRate = (acceptedJobCount / totalJobCount) * 100;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalJobCount ? (
              <NumberTicker
                value={totalJobCount}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            Applications submitted
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {pendingJobCount ? (
              <NumberTicker
                value={pendingJobCount}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
          </div>
          <p className="text-muted-foreground text-sm">Waiting for response </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {interviewJobCount ? (
              <NumberTicker
                value={interviewJobCount}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
          </div>
          <p className="text-muted-foreground text-sm">In interview Phase</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Accepted</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {acceptedJobCount ? (
              <NumberTicker
                value={acceptedJobCount}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
          </div>
          <p className="text-muted-foreground text-sm">Job offers received</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Rejected</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {rejectedJobCount ? (
              <NumberTicker
                value={rejectedJobCount}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
          </div>
          <p className="text-muted-foreground text-sm">Rejected</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {successRate ? (
              <NumberTicker
                value={successRate}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
            %
          </div>
          <p className="text-muted-foreground text-sm">
            Applications that resulted in offers
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

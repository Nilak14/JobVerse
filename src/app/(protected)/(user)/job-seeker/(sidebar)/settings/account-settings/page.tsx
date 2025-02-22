import AccountSettingContent from "@/components/JobSeeker/Settings/AccountSettingContent";
import AccountSettingContentShimmer from "@/components/skeletons/JobSeekerAccountSettingSkeleton";
import BoxReveal from "@/components/ui/box-reveal";
import { getJobSeekerProfile } from "@/data-access/job-seeker/jobSeekerProfile";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await auth();
  if (!session || !session.user) {
    return {};
  }
  return {
    title: session.user.name,
    description: "Account settings page for " + session.user.name,
  };
};

const JobSeekerAccountSettingsPage = async () => {
  return (
    <section className="space-y-10">
      <BoxReveal>
        <div className="space-y-3">
          <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground  tracking-wide">
            Manage your JobVerse Account and preferences
          </p>
        </div>
      </BoxReveal>
      <Suspense fallback={<AccountSettingContentShimmer />}>
        <JobSeekerProfile />
      </Suspense>
    </section>
  );
};
export default JobSeekerAccountSettingsPage;

const JobSeekerProfile = async () => {
  const jobSeekerProfile = await getJobSeekerProfile();
  if (!jobSeekerProfile) {
    notFound();
  }
  return <AccountSettingContent profile={jobSeekerProfile} />;
};

import JobSeekerPremiumModal from "@/components/premium/JobSeekerPremiumModal";
import JobSeekerSubscriptionLevelProvider from "@/context/JobSeekerSubscriptionLevelProvider";
import { getJobSeekerSubscriptionLevel } from "@/data-access/subscription/jobseekerSubscription";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const JobSeekerLayout = async ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const session = await auth();
  if (!session || session.user.type !== "JOB_SEEKER" || !session.user.id) {
    redirect("/");
  }
  const subscriptionLevel = await getJobSeekerSubscriptionLevel(
    session.user.id
  );

  return (
    <JobSeekerSubscriptionLevelProvider
      userSubscriptionLevel={subscriptionLevel}
    >
      {children}
      <JobSeekerPremiumModal />
    </JobSeekerSubscriptionLevelProvider>
  );
};
export default JobSeekerLayout;

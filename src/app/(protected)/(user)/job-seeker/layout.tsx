import JobSeekerPremiumModal from "@/components/premium/JobSeekerPremiumModal";
import JobSeekerSubscriptionLevelProvider from "@/context/JobSeekerSubscriptionLevelProvider";
import { getUserSubscription } from "@/data-access/subscription/getUserSubscription";
import { getJobSeekerSubscriptionLevel } from "@/data-access/subscription/jobseekerSubscription";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";

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
  const { subscription, priceInfo } = await getUserSubscription();
  const currentPlan = priceInfo
    ? (priceInfo.product as Stripe.Product).name
    : "Free";
  return (
    <JobSeekerSubscriptionLevelProvider
      userSubscriptionLevel={subscriptionLevel}
    >
      {children}
      <JobSeekerPremiumModal currentPlan={currentPlan} />
    </JobSeekerSubscriptionLevelProvider>
  );
};
export default JobSeekerLayout;

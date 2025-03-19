import { setActiveCompany } from "@/actions/companies/setActiveCompany";
import InvitationsModal from "@/components/InvitationsModal";
import CompanyPremiumModal from "@/components/premium/CompanyPremiumModal";
import CompanySubscriptionLevelProvider from "@/context/CompanySubscriptionLevelProvider";
import { getCompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";
import { getCompanySubscription } from "@/data-access/subscription/getCompanySubscription";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.type !== "EMPLOYER") {
    redirect("/login");
  }

  const userE = await prisma.user.findFirst({
    where: { id: user.id },
    include: {
      EMPLOYER: {
        include: {
          companyMemberships: {
            where: {
              isDeleted: false,
            },
          },
        },
      },
    },
  });

  const isOnCompany = userE?.EMPLOYER?.companyMemberships.length;
  if (!isOnCompany) {
    redirect("/onboarding/employer");
  }

  if (!session.activeCompanyId) {
    await setActiveCompany();
  }
  const subscriptionLevel = await getCompanySubscriptionLevel(
    session.activeCompanyId!
  );
  const { priceInfo, subscription } = await getCompanySubscription();
  const currentPlan = priceInfo
    ? (priceInfo.product as Stripe.Product).name
    : "Free";
  return (
    <>
      <CompanySubscriptionLevelProvider
        companySubscriptionLevel={subscriptionLevel}
      >
        {children}
        <InvitationsModal user={user} />
        <CompanyPremiumModal currentPlan={currentPlan} />
      </CompanySubscriptionLevelProvider>
    </>
  );
};
export default layout;

import { CompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";

export function canPostJob(
  subscriptionLevel: CompanySubscriptionLevel,
  currentJobCount: number
) {
  const maxJobMap: Record<CompanySubscriptionLevel, number> = {
    FREE: 5,
    PRO: 10,
    ELITE: Infinity,
  };
  const maxJobs = maxJobMap[subscriptionLevel];
  return currentJobCount < maxJobs;
}

export function canUseAITools(subscriptionLevel: CompanySubscriptionLevel) {
  return subscriptionLevel !== "FREE";
}

export function canParseResumeSummary(
  subscriptionLevel: CompanySubscriptionLevel
) {
  return subscriptionLevel === "ELITE";
}

export function canGenerateEmbeddings(
  subscriptionLevel: CompanySubscriptionLevel
) {
  return subscriptionLevel !== "FREE";
}
export function canCustomizeEmbeddings(
  subscriptionLevel: CompanySubscriptionLevel
) {
  return subscriptionLevel === "ELITE";
}

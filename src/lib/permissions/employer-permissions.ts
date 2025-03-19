import { CompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";

export function canPostJob(
  subscriptionLevel: CompanySubscriptionLevel,
  currentJobCount: number
) {
  const maxJobMap: Record<CompanySubscriptionLevel, number> = {
    FREE: 1,
    PRO: 5,
    ELITE: Infinity,
  };
  const maxResumes = maxJobMap[subscriptionLevel];
  return currentJobCount < maxResumes;
}

export function canUseAITools(subscriptionLevel: CompanySubscriptionLevel) {
  return subscriptionLevel !== "FREE";
}

export function canParseResumeSummary(
  subscriptionLevel: CompanySubscriptionLevel
) {
  return subscriptionLevel === "ELITE";
}

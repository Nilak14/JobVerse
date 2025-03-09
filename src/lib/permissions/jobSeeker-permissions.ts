import { JobSeekerSubscriptionLevel } from "@/data-access/subscription/jobseekerSubscription";

export function canCreateResume(
  subscriptionLevel: JobSeekerSubscriptionLevel,
  currentResumeCount: number
) {
  const maxResumeMap: Record<JobSeekerSubscriptionLevel, number> = {
    FREE: 1,
    PRO: 5,
    ELITE: Infinity,
  };
  const maxResumes = maxResumeMap[subscriptionLevel];
  return currentResumeCount < maxResumes;
}

export function canUseAITools(subscriptionLevel: JobSeekerSubscriptionLevel) {
  return subscriptionLevel !== "FREE";
}

export function canUseCustomizations(
  subscriptionLevel: JobSeekerSubscriptionLevel
) {
  return subscriptionLevel === "ELITE";
}

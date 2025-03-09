"use client";

import { JobSeekerSubscriptionLevel } from "@/data-access/subscription/jobseekerSubscription";
import { createContext, useContext } from "react";

const JobSeekerSubscriptionLevelContext = createContext<
  JobSeekerSubscriptionLevel | undefined
>(undefined);

interface JobSeekerSubscriptionLevelProviderProps {
  children: React.ReactNode;
  userSubscriptionLevel: JobSeekerSubscriptionLevel;
}

export default function JobSeekerSubscriptionLevelProvider({
  children,
  userSubscriptionLevel,
}: JobSeekerSubscriptionLevelProviderProps) {
  return (
    <JobSeekerSubscriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </JobSeekerSubscriptionLevelContext.Provider>
  );
}

export function useJobSeekerSubscriptionLevel() {
  const context = useContext(JobSeekerSubscriptionLevelContext);
  if (context === undefined) {
    throw new Error(
      "useJobSeekerSubscriptionLevel must be used within a JobSeekerSubscriptionLevelProvider"
    );
  }
  return context;
}

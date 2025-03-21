"use client";

import { CompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";
import { createContext, useContext } from "react";

const CompanySubscriptionLevelContext = createContext<
  CompanySubscriptionLevel | undefined
>(undefined);
interface CompanySubscriptionLevelProviderProps {
  children: React.ReactNode;
  companySubscriptionLevel: CompanySubscriptionLevel;
}
export default function CompanySubscriptionLevelProvider({
  children,
  companySubscriptionLevel,
}: CompanySubscriptionLevelProviderProps) {
  return (
    <CompanySubscriptionLevelContext.Provider value={companySubscriptionLevel}>
      {children}
    </CompanySubscriptionLevelContext.Provider>
  );
}

export function useCompanySubscriptionLevel() {
  const context = useContext(CompanySubscriptionLevelContext);
  if (context === undefined) {
    throw new Error(
      "useCompanySubscriptionLevel must be used within a CompanySubscriptionLevelProvider"
    );
  }
  return context;
}

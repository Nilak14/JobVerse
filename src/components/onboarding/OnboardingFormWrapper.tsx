"use client";

import { cn } from "@/lib/utils";

interface OnboardingFormWrapperProps {
  children: React.ReactNode;
  classname?: string;
  headerLabel?: string;
  secondaryHeaderLabel?: string;
}
const OnboardingFormWrapper = ({
  children,
  classname,
  headerLabel,
  secondaryHeaderLabel,
}: OnboardingFormWrapperProps) => {
  return (
    <section
      className={cn(
        "px-9 bg-background pt-10 w-[90vw] max-w-[1000px] border rounded-md border-gray-600",
        classname
      )}
    >
      <h1 className="text-2xl font-bold mb-2">{headerLabel}</h1>
      <p className="mb-6 text-muted-foreground text-sm">
        {secondaryHeaderLabel}
      </p>
      {children}
    </section>
  );
};
export default OnboardingFormWrapper;

export const InputWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-x-20 gap-y-5">
      {children}
    </div>
  );
};

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { OnBoardingStep } from "@/lib/types";
import React from "react";

interface BreadCrumbProps {
  steps: OnBoardingStep[];
  currentStep: string;
  setCurrentStep: (step: string) => void;
}
const BreadCrumb = ({
  steps,
  currentStep,
  setCurrentStep,
}: BreadCrumbProps) => {
  return (
    <section className="flex justify-center px-8">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center justify-center ">
          {steps.map((step) => (
            <React.Fragment key={step.key}>
              <BreadcrumbItem className="tracking-wider">
                {step.key === currentStep ? (
                  <BreadcrumbPage>
                    <span className="text-primary cursor-pointer">
                      {step.title}
                    </span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrentStep(step.key)}>
                      {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden" />
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
};
export default BreadCrumb;

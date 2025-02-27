import { JobEditorFormSteps } from "@/lib/multi-form-steps/JobEditorStep";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface JobEditorBreadcrumbsProps {
  currentStep: string;
}
const JobEditorBreadcrumbs = ({ currentStep }: JobEditorBreadcrumbsProps) => {
  const currentStepIndex = JobEditorFormSteps.findIndex(
    (step) => step.key === currentStep
  );
  return (
    <div className="w-full  px-4 py-6">
      <div className="hidden lg:block relative">
        <div className="relative flex  items-center justify-between">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
          <motion.div
            className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2"
            initial={{ width: "0%" }}
            animate={{
              width: `${(currentStepIndex / (JobEditorFormSteps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />

          {JobEditorFormSteps.map((step, index) => (
            <div
              key={step.key}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center border-2",
                  step.key === currentStep || index < currentStepIndex
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 bg-white text-gray-400"
                )}
                initial={false}
                animate={{
                  scale: step.key === currentStep ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {index < currentStepIndex ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </motion.div>

              <motion.span
                className={cn(
                  "absolute -bottom-6 text-[10px] font-medium whitespace-nowrap",
                  step.key === currentStep ? "text-primary" : "text-white"
                )}
                initial={false}
                animate={{
                  scale: step.key === currentStep ? 1.1 : 1,
                }}
              >
                {step.title}
              </motion.span>
            </div>
          ))}
        </div>
      </div>

      {/* Smaller Device */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">
            Step {currentStepIndex + 1} of {JobEditorFormSteps.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {JobEditorFormSteps[currentStepIndex].title}
          </span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStepIndex + 1) / JobEditorFormSteps.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};
export default JobEditorBreadcrumbs;

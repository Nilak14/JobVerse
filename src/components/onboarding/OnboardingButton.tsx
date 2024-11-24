import { Button } from "@/components/ui/button";
import { OnBoardingStep } from "@/lib/types";
interface OnboardingButtonProps {
  steps: OnBoardingStep[];
  setCurrentStep: (step: string) => void;
  currentStep: string;
}
const OnboardingButton = ({
  currentStep,
  setCurrentStep,
  steps,
}: OnboardingButtonProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;
  return (
    <div className="flex  justify-between">
      <Button
        disabled={!previousStep}
        onClick={previousStep ? () => setCurrentStep(previousStep) : undefined}
        variant={"secondary"}
      >
        Previous Step
      </Button>
      <Button
        disabled={!nextStep}
        onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
      >
        Next Step
      </Button>
    </div>
  );
};
export default OnboardingButton;

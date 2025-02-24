import Link from "next/link";
import { Button } from "../ui/button";
import { ResumeEditorFormSteps } from "@/lib/multi-form-steps/ResumeEditorStep";

interface ResumeEditorFooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const ResumeEditorFooter = ({
  currentStep,
  setCurrentStep,
}: ResumeEditorFooterProps) => {
  const previousStep = ResumeEditorFormSteps.find(
    (_, index) => ResumeEditorFormSteps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = ResumeEditorFormSteps.find(
    (_, index) => ResumeEditorFormSteps[index - 1]?.key === currentStep
  )?.key;
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"secondary"}>
            <Link href={"/job-seeker/design-studio/resume"}>Cancel</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
};
export default ResumeEditorFooter;

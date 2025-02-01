import Link from "next/link";
import { Button } from "../ui/button";
import { JobEditorFormSteps } from "@/lib/multi-form-steps/JobEditorStep";

interface JobEditorFooterProps {
  currentStep: string;
  setCurrentStep: (key: string, isPrev: boolean) => void;
}

const JobEditorFooter = ({
  currentStep,
  setCurrentStep,
}: JobEditorFooterProps) => {
  const previousStep = JobEditorFormSteps.find(
    (_, index) => JobEditorFormSteps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = JobEditorFormSteps.find(
    (_, index) => JobEditorFormSteps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className=" mx-auto flex flex-wrap justify-between gap-3 px-4 md:px-12 lg:px-24">
        <div className="flex items-center gap-3">
          <Button
            disabled={!previousStep}
            variant={"secondary"}
            onClick={
              previousStep
                ? () => setCurrentStep(previousStep, true)
                : undefined
            }
          >
            Previous Step
          </Button>
          <Button
            disabled={!nextStep}
            onClick={
              nextStep ? () => setCurrentStep(nextStep, false) : undefined
            }
          >
            Next Step
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"secondary"} asChild>
            <Link href={"/employer/job"}>Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
};
export default JobEditorFooter;

import Link from "next/link";
import { Button } from "../ui/button";
import { JobEditorFormSteps } from "@/lib/multi-form-steps/JobEditorStep";
import { Eye, FileUserIcon, PenLineIcon, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface JobEditorFooterProps {
  currentStep: string;
  setCurrentStep: (key: string, isPrev: boolean) => void;
  showSMPreview: boolean;
  setShowSMPreview: (show: boolean) => void;
}

const JobEditorFooter = ({
  currentStep,
  setCurrentStep,
  setShowSMPreview,
  showSMPreview,
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
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="md:hidden"
                variant={"outline"}
                size={"icon"}
                onClick={() => setShowSMPreview(!showSMPreview)}
              >
                {showSMPreview ? <X /> : <Eye />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {showSMPreview ? "Close Preview" : "Show Preview"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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

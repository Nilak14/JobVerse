import Link from "next/link";
import { Button } from "../ui/button";
import { ResumeEditorFormSteps } from "@/lib/multi-form-steps/ResumeEditorStep";
import { FileUserIcon, Pen, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeEditorFooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

const ResumeEditorFooter = ({
  currentStep,
  setCurrentStep,
  setShowSmResumePreview,
  showSmResumePreview,
  isSaving,
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
        <Button
          title={
            showSmResumePreview ? "Show Resume Form" : "Show Resume Preview"
          }
          className="md:hidden"
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant={"secondary"}>
            <Link href={"/job-seeker/design-studio/resume"}>Cancel</Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              isSaving && "opacity-100"
            )}
          >
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
};
export default ResumeEditorFooter;

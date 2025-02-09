import Link from "next/link";
import { Button } from "../ui/button";
import { JobEditorFormSteps } from "@/lib/multi-form-steps/JobEditorStep";
import { AlertCircle, ChevronDown, Eye, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingButton from "../ui/loading-button";
import { JobStatus } from "@prisma/client";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { useState, useTransition } from "react";
import { changeJobStatus } from "@/actions/job/changeJobStatusEmployer";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
interface JobEditorFooterProps {
  currentStep: string;
  setCurrentStep: (key: string, isPrev: boolean) => void;
  showSMPreview: boolean;
  setShowSMPreview: (show: boolean) => void;
  isSaving: boolean;
  jobId: string | undefined;
}

const JobEditorFooter = ({
  currentStep,
  setCurrentStep,
  setShowSMPreview,
  showSMPreview,
  isSaving,
  jobId,
}: JobEditorFooterProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const previousStep = JobEditorFormSteps.find(
    (_, index) => JobEditorFormSteps[index + 1]?.key === currentStep
  )?.key;
  const [showDialog, setShowDialog] = useState(false);
  const nextStep = JobEditorFormSteps.find(
    (_, index) => JobEditorFormSteps[index - 1]?.key === currentStep
  )?.key;

  const isLastStep =
    JobEditorFormSteps[JobEditorFormSteps.length - 1].key === currentStep;

  const saveJobAs = (as: JobStatus) => {
    if (!jobId) return;
    startTransition(async () => {
      const res = await changeJobStatus(jobId, as);
      if (res.success) {
        if (as === "DRAFT") {
          router.replace("/employer/job");
          toast.success("Saved As Draft", { id: "job-status" });
        } else if (as === "PENDING") {
          router.replace("/employer/job");
          toast.success(
            "Job is Published, You will be notified once it is live",
            { id: "job-status" }
          );
        }
      } else {
        toast.error(res.message, { id: "job-status" });
      }
    });
  };

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
          {isLastStep ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <LoadingButton
                  loading={isSaving || isPending}
                  className="flex justify-between items-center"
                >
                  <span>Save As</span>
                  <ChevronDown />
                </LoadingButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <LoadingButton
                    showIconOnly
                    loading={isPending}
                    onClick={() => {
                      saveJobAs(JobStatus.DRAFT);
                    }}
                    className="w-full justify-start"
                    variant={"ghost"}
                  >
                    Save as Draft
                  </LoadingButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    disabled={isPending}
                    onClick={() => setShowDialog(true)}
                    className="w-full justify-start"
                    variant={"ghost"}
                  >
                    Send For Review
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              disabled={!nextStep}
              onClick={
                nextStep ? () => setCurrentStep(nextStep, false) : undefined
              }
            >
              Next Step
            </Button>
          )}
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
          <Button disabled={isPending || isSaving} variant={"secondary"}>
            {isPending || isSaving ? (
              <p>Close</p>
            ) : (
              <Link href={"/employer/job"}>Close</Link>
            )}
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
      <ResponsiveModal open={showDialog} onOpenChange={setShowDialog}>
        <ResponsiveModalContent
          isloading={isPending}
          className="space-y-5 md:space-y-0 overflow-x-hidden"
        >
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Send For a Review</ResponsiveModalTitle>
            <ResponsiveModalDescription className="sr-only">
              Submitting this job means the request will be sent to the JobVerse
              team for review and approval. You will be notified once the job is
              live.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Alert variant="info">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              By submitting this job, your request will be sent to the JobVerse
              team for review and approval. You will be notified once the job
              post is successfully reviewed and live.
            </AlertDescription>
          </Alert>
          <ResponsiveModalFooter>
            <Button
              disabled={isPending}
              onClick={() => setShowDialog(false)}
              className="w-full mb-5 md:mb-0"
              variant={"secondary"}
            >
              Cancel
            </Button>
            <LoadingButton
              showIconOnly
              loading={isPending}
              onClick={() => saveJobAs(JobStatus.PENDING)}
              className="w-full mb-5 md:mb-0"
            >
              Send
            </LoadingButton>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </footer>
  );
};
export default JobEditorFooter;

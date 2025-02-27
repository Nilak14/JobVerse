"use client";

import ResumeEditorFooter from "@/components/Resume/ResumeEditorFooter";
import ResumePreviewSection from "@/components/Resume/ResumePreviewSection";
import ResumeEditorBreadCrumb from "@/components/ResumeEditorBreadCrumbs";
import useWarning from "@/hooks/custom-hooks/use-warning";
import useAutoSaveResume from "@/hooks/custom-hooks/useAutoSaveResume";
import { ResumeEditorFormSteps } from "@/lib/multi-form-steps/ResumeEditorStep";
import { JobSeekerProfile } from "@/lib/prisma-types/JobSeekerProfile";
import { ResumeServerData } from "@/lib/prisma-types/Resume";
import { cn, mapToResumeValues, profileToResumeValue } from "@/lib/utils";
import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
  jobSeekerProfile: JobSeekerProfile | null;
}
const ResumeEditor = ({
  resumeToEdit,
  jobSeekerProfile,
}: ResumeEditorProps) => {
  const stateDefaultData = resumeToEdit
    ? mapToResumeValues(resumeToEdit)
    : jobSeekerProfile
      ? profileToResumeValue(jobSeekerProfile)
      : {};
  const [resumeData, setResumeData] = useState<ResumeValues>(stateDefaultData);

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || ResumeEditorFormSteps[0].key;

  const { hasUnsavedChanges, isSaving } = useAutoSaveResume(resumeData);

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  }
  const FormComponent = ResumeEditorFormSteps.find(
    (step) => step.key === currentStep
  )?.component;

  useWarning(hasUnsavedChanges);

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your Progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full md:w-1/2 p-3 overflow-y-auto space-y-6 md:block",
              showSmResumePreview && "hidden"
            )}
          >
            <ResumeEditorBreadCrumb
              currentStep={currentStep}
              setCurrentStep={setStep}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            className={cn(showSmResumePreview && "flex")}
            resumeDate={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </main>
      <ResumeEditorFooter
        isSaving={isSaving}
        setShowSmResumePreview={setShowSmResumePreview}
        showSmResumePreview={showSmResumePreview}
        currentStep={currentStep}
        setCurrentStep={setStep}
      />
    </div>
  );
};
export default ResumeEditor;

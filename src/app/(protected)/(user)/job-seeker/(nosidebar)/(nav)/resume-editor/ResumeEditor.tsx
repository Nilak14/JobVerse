"use client";

import ResumeEditorFooter from "@/components/Resume/ResumeEditorFooter";
import ResumeEditorBreadCrumb from "@/components/ResumeEditorBreadCrumbs";
import { ResumeEditorFormSteps } from "@/lib/multi-form-steps/ResumeEditorStep";
import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<ResumeValues>({});

  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || ResumeEditorFormSteps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  }
  const FormComponent = ResumeEditorFormSteps.find(
    (step) => step.key === currentStep
  )?.component;
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
          <div className="w-full md:w-1/2 p-3 overflow-y-auto space-y-6">
            {/* <GeneralInfoForm /> */}
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
          <div className="grow md:border-r"></div>
          <div className="hidden w-1/2 md:flex ">right</div>
        </div>
      </main>
      <ResumeEditorFooter currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
};
export default ResumeEditor;

import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useDebounce } from "./use-debounce";
import { useEffect, useState } from "react";

const useAutoSaveResume = (resumeData: ResumeValues) => {
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [lastSaveData, setLastSaveData] = useState(structuredClone(resumeData));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function saveResume() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSaveData(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSaveData);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving) {
      saveResume();
    }
  }, [debouncedResumeData, isSaving, lastSaveData]);
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSaveData),
  };
};

export default useAutoSaveResume;

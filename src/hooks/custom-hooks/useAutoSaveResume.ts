import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useDebounce } from "./use-debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { saveResume } from "@/actions/resume/saveResume";
import { toast } from "sonner";
import { fileReplacer } from "@/lib/utils";

const useAutoSaveResume = (resumeData: ResumeValues) => {
  const searchParams = useSearchParams();
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [lastSaveData, setLastSaveData] = useState(structuredClone(resumeData));
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSaveData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });
        setResumeId(updatedResume.id);
        setLastSaveData(newData);
        if (searchParams.get("id") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("id", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
        toast.error("Failed to save resume", {
          id: "save-resume",

          action: {
            key: "retry",
            label: "Retry",

            onClick: () => save(),
          },
        });
      } finally {
        setIsSaving(false);
      }
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSaveData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSaveData,
    isError,
    resumeId,
    searchParams,
  ]);
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSaveData),
  };
};

export default useAutoSaveResume;

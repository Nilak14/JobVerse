import { JobSchemaType } from "@/schema/CreateJobSchema";
import { useDebounce } from "./use-debounce";
import { useEffect, useState } from "react";

export default function useAutoSaveJobPost(jobData: JobSchemaType) {
  const debouncedJobData = useDebounce(jobData, 1500);
  const [lastSaveData, setLastSaveData] = useState<JobSchemaType>(
    structuredClone(jobData)
  );
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    async function saveJobPost() {
      setIsSaving(true);
      //todo: call the backend to save the job post
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLastSaveData(structuredClone(debouncedJobData));
      setIsSaving(false);
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedJobData) !== JSON.stringify(lastSaveData);

    if (hasUnsavedChanges && debouncedJobData && !isSaving) {
      saveJobPost();
    }
  }, [debouncedJobData, lastSaveData, isSaving]);

  return {
    isSaving,
    hasUnsavedChanges: JSON.stringify(jobData) !== JSON.stringify(lastSaveData),
  };
}

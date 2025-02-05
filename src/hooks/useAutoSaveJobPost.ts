import { JobSchemaType } from "@/schema/CreateJobSchema";
import { useDebounce } from "./use-debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { saveJob } from "@/actions/job/saveJob";
import { toast } from "sonner";

export default function useAutoSaveJobPost(jobData: JobSchemaType) {
  const debouncedJobData = useDebounce(jobData, 1500);
  const searchParams = useSearchParams();
  const [jobId, setJobId] = useState(jobData.id);

  const [lastSaveData, setLastSaveData] = useState<JobSchemaType>(
    structuredClone(jobData)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(false);
  }, [debouncedJobData]);

  useEffect(() => {
    async function saveJobPost() {
      try {
        toast.dismiss("save-job");
        setIsSaving(true);
        setIsError(false);
        const newData = structuredClone(debouncedJobData);
        const updatedJobData = await saveJob({
          ...newData,
          ...(lastSaveData.description === newData.description && {
            description: undefined,
          }),
          id: jobId,
        });

        setJobId(updatedJobData.id);
        setLastSaveData(newData);

        if (searchParams.get("jobId") !== updatedJobData.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("jobId", updatedJobData.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        toast.error("Failed to save job post", {
          id: "save-job",
          action: {
            key: "retry",
            label: "Retry",
            onClick: () => saveJobPost(),
          },
        });
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedJobData) !== JSON.stringify(lastSaveData);

    if (hasUnsavedChanges && debouncedJobData && !isSaving && !isError) {
      saveJobPost();
    }
  }, [debouncedJobData, lastSaveData, isSaving, isError, jobId, searchParams]);

  return {
    isSaving,
    hasUnsavedChanges: JSON.stringify(jobData) !== JSON.stringify(lastSaveData),
    jobId,
  };
}

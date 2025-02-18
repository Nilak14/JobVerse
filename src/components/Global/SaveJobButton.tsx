import { getSavedJobInfo } from "@/hooks/query-hooks/getSavedJobInfo";
import { useUpdateSaveJob } from "@/hooks/use-actions/useUpdateSaveJob";
import { SaveJobInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface SaveJobButtonProps {
  jobId: string;
  initialState: SaveJobInfo;
  className?: string;
  withText?: boolean;
}
const SaveJobButton = ({
  initialState,
  jobId,
  className,
  withText = false,
}: SaveJobButtonProps) => {
  const { data, isLoading } = getSavedJobInfo(jobId, initialState);
  const { mutate, error, isError } = useUpdateSaveJob(jobId, data!);

  return (
    <button
      disabled={isLoading}
      onClick={() => mutate()}
      className={cn(
        "flex justify-center items-center gap-2 hover:text-red-500 disabled:animate-pulse",
        className
      )}
    >
      <Heart
        className={cn(
          " size-5 group",
          data?.isSavedByUser && "fill-red-500 text-red-500",
          isLoading && "animate-pulse"
        )}
      />
      {withText && (
        <span className="hover:text-foreground text-foreground">
          {data?.isSavedByUser ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
};
export default SaveJobButton;

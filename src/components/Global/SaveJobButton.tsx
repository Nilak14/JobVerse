import { SaveJobInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";

interface SaveJobButtonProps {
  children?: React.ReactNode;
  jobId?: string;
  initialState?: SaveJobInfo;
  className?: string;
  withText?: boolean;
}
const SaveJobButton = ({
  initialState,
  jobId,
  children,
  className,
  withText = false,
}: SaveJobButtonProps) => {
  return (
    <button
      className={cn(
        "flex justify-center items-center gap-2 hover:text-red-500",
        className
      )}
    >
      <Heart
        className={cn(" size-5 group", false && "fill-red-500 text-red-500")}
      />
      {withText && (
        <span className="hover:text-foreground text-foreground">Save</span>
      )}
    </button>
  );
};
export default SaveJobButton;

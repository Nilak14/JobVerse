"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Pause, Trash, X, XCircle } from "lucide-react";
import { useState } from "react";

import LoadingButton from "@/components/ui/loading-button";
import { toast } from "sonner";
import { changeJobStatus } from "@/actions/job/changeJobStatusEmployer";
interface PauseJobPopoverProps {
  jobId: string;
}
const PauseJobPopover = ({ jobId }: PauseJobPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pauseJobOnClick = async () => {
    setLoading(true);
    try {
      const res = await changeJobStatus(jobId, "PAUSED");
      if (res.success) {
        toast.success(res.message);
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to pause job");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onClick={() => setOpen(true)}>
        <p className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-accent">
          <XCircle color="#ef4444" className="h-4 w-4 mr-2 " />
          <span>Close Job</span>
        </p>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-2">
          <h3 className="">Close Job</h3>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to close hiring for this job?
          </p>
          <div className="flex justify-between space-x-3">
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <LoadingButton
              onClick={pauseJobOnClick}
              loading={loading}
              variant="default"
            >
              Close
            </LoadingButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default PauseJobPopover;

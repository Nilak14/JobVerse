import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { Button } from "../ui/button";
import LoadingButton from "../ui/loading-button";
import { useForm } from "react-hook-form";
import {
  ScheduleInterviewSchema,
  ScheduleInterviewSchemaType,
} from "@/schema/ScheduleInterviewSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { InterviewType } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { scheduleInterview } from "@/actions/application/scheduleInterview";
interface ScheduledInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: JobApplicationEmployer;
}

const ScheduledInterviewModal = ({
  isOpen,
  onClose,
  application,
}: ScheduledInterviewModalProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ScheduleInterviewSchemaType>({
    defaultValues: {
      applicationId: application.id,
      interviewDate: "",
      interviewTime: "",
      interviewType: "",
      note: "",
    },
    resolver: zodResolver(ScheduleInterviewSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ScheduleInterviewSchemaType) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await scheduleInterview(data);
      if (res.success) {
        toast.success("Interview Scheduled Successfully");
        onClose();
      } else {
        toast.error("Failed to Schedule Interview");
      }
    } catch (error) {
      toast.error("Failed to Schedule Interview");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ResponsiveModal open={isOpen} onOpenChange={onClose}>
      <ResponsiveModalContent isloading={loading ? "true" : undefined}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Schedule Interview</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Schedule an interview with {application.jobSeeker.user.name} for the{" "}
            {application.job.title}.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 mb-6">
              <FormField
                control={form.control}
                name="interviewDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Date</FormLabel>
                    <FormControl>
                      <Input
                        min={new Date().toISOString().split("T")[0]}
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interviewTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Time</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interviewType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Interview Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={InterviewType.VIDEO_CALL}>
                          Video Call
                        </SelectItem>
                        <SelectItem value={InterviewType.VOICE_CALL}>
                          Phone Call
                        </SelectItem>
                        <SelectItem value={InterviewType.FACE_TO_FACE}>
                          In Person
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Note{" "}
                      <span className="text-xs text-muted-foreground">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none h-24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <ResponsiveModalFooter className="flex gap-4 mt-5 md:mt-0">
              <Button
                disabled={loading}
                className="flex-1"
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                showIconOnly
                type="submit"
                className="flex-1"
              >
                Schedule
              </LoadingButton>
            </ResponsiveModalFooter>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ScheduledInterviewModal;

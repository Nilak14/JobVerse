"use client";

import type { JobEditorFormProps } from "@/lib/types";
import {
  JobSettingsSchema,
  type JobSettingsSchemaType,
} from "@/schema/CreateJobSchema";
import { useFormTriggersStore } from "@/store/useFormTriggersStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Edit, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useActiveCompany } from "@/store/useActiveCompany";
import Link from "next/link";
import { useQueryGetCompanyLinkedinStatus } from "@/hooks/query-hooks/getCompanyLinkedinStatus";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
const JobSettingForm = ({
  currentStep,
  jobData,
  setJobData,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const { activeCompany } = useActiveCompany();
  const form = useForm<JobSettingsSchemaType>({
    defaultValues: {
      resumeRequired: jobData.resumeRequired || false,
      getEmailNotification: jobData.getEmailNotification || false,
      applicationDeadline: jobData.applicationDeadline || null,
      isUrgent: jobData.isUrgent || false,
      postInLinkedin: jobData.postInLinkedin || false,
      linkedinCaption:
        jobData.linkedinCaption ||
        `We're hiring! Check out this ${jobData.title} position at ${activeCompany.name}. Apply here: https://www.jobverse.me/job/description/${jobData.id}`,
    },
    resolver: zodResolver(JobSettingsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setTrigger(currentStep, form.trigger);
  }, [form.trigger, setTrigger]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setJobData({ ...jobData, ...values });
    });
    return unsubscribe;
  }, []);
  const { data, isLoading } = useQueryGetCompanyLinkedinStatus(
    activeCompany.id
  );

  const [showLinkedinModal, setShowLinkedinModal] = useState(false);

  const postInLinkedinValue = form.watch("postInLinkedin");

  return (
    <div className="max-w-xl mx-auto space-y-6 pt-5">
      {/* <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Job Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure the settings for your job posting.
        </p>
      </div> */}
      <Form {...form}>
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"></div>
          <FormField
            control={form.control}
            name="applicationDeadline"
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <FormLabel>Application Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      disabled={(date) => date < new Date()}
                      mode="single"
                      selected={
                        field.value instanceof Date ? field.value : undefined
                      }
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isUrgent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Add Urgent Tag?</FormLabel>
                  <FormDescription>
                    Selecting this will add an urgent tag to the job post
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resumeRequired"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Resume Required</FormLabel>
                  <FormDescription>
                    Is Resume Required to apply for this job
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="getEmailNotification"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    disabled={!activeCompany.slackChannelId}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Get Slack Notification </FormLabel>
                  <FormDescription>
                    <p className="text-sm text-muted-foreground">
                      {activeCompany.slackChannelId ? (
                        <p>
                          Get notified on slack when a new applicant applies for
                          this job
                        </p>
                      ) : (
                        <span className="text-sm text-red-500">
                          Please connect your slack account to enable this
                          feature. To connect your slack account, please{" "}
                          <Link
                            className="underline underline-offset-4 "
                            href={"/employer/company/setting"}
                          >
                            Click Here
                          </Link>
                          .
                        </span>
                      )}
                    </p>
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postInLinkedin"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    disabled={isLoading || (!data?.data && !isLoading)}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none w-full">
                  <div className="flex justify-between items-center">
                    <FormLabel>Post in LinkedIn</FormLabel>
                    {postInLinkedinValue && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowLinkedinModal(true)}
                        className="h-8"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1.5" />
                        Edit Caption
                      </Button>
                    )}
                  </div>
                  <FormDescription>
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Checking LinkedIn connection status...
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {data?.data ? (
                          <p>
                            Share this job posting on your company's LinkedIn
                            page
                          </p>
                        ) : (
                          <span className="text-sm text-red-500">
                            Please connect your LinkedIn account to enable this
                            feature. To connect your LinkedIn account, please{" "}
                            <Link
                              className="underline underline-offset-4"
                              href={"/employer/company/setting"}
                            >
                              Click Here
                            </Link>
                            .
                          </span>
                        )}
                      </p>
                    )}
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Dialog open={showLinkedinModal} onOpenChange={setShowLinkedinModal}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>LinkedIn Post Caption</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="linkedinCaption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Enter caption for your LinkedIn post
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="linkedin-caption"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your job will be posted on LinkedIn with this caption.
                          Include relevant details to attract candidates.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setShowLinkedinModal(false)}>
                  Save Caption
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
};
export default JobSettingForm;

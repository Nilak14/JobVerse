import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { useFormTriggersStore } from "@/store/useFormTriggersStore";
import { JobEditorFormProps } from "@/lib/types";
import { JobTagsSchema, JobTagsSchemaType } from "@/schema/CreateJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputTags } from "@/components/ui/input-tag";

const JobQualificationForm = ({
  currentStep,
  jobData,
  setJobData,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const form = useForm<JobTagsSchemaType>({
    defaultValues: {
      tags: jobData.tags || [],
    },
    resolver: zodResolver(JobTagsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setTrigger(currentStep, form.trigger);
  }, [form.trigger, setTrigger]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setJobData({
        ...jobData,
        ...values,
        tags:
          values.tags?.filter((benefit): benefit is string => !!benefit) || [],
      });
    });
    return unsubscribe;
  }, [form, jobData, setJobData]);

  return (
    <div className="max-w-[90%] mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Job Qualifications</h2>
        <p className="text-sm text-muted-foreground">
          Use Qualifications to find the right candidates for your job.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Tags (Upto 15)</FormLabel>
                <FormControl>
                  <InputTags
                    maxLength={15}
                    {...field}
                    onChange={(e) => field.onChange(e)}
                  />
                </FormControl>
                <FormDescription>
                  Type Text and press enter to add the tag. This will help job
                  seekers find your job easily.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default JobQualificationForm;

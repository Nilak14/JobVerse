import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useForm } from "react-hook-form";
import { useFormTriggersStore } from "@/store/useFormTriggersStore";
import { JobEditorFormProps } from "@/lib/types";
import {
  JobDescriptionSchema,
  JobDescriptionSchemaType,
} from "@/schema/CreateJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import CustomTipTapEditor from "@/components/tiptap/CustomTipTapEditor";
import GenerateJobDescriptionButton from "@/components/Job/GenerateJobDescriptionButton";

const JobDescriptionForm = ({
  currentStep,
  jobData,
  setJobData,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const [aiDescription, setAiDescription] = useState<any | null>();
  const form = useForm<JobDescriptionSchemaType>({
    defaultValues: {
      description: jobData.description || "",
    },
    resolver: zodResolver(JobDescriptionSchema),
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
      });
    });
    return unsubscribe;
  }, [form, jobData, setJobData]);

  return (
    <div className="max-w-[90%] mx-auto space-y-6 pt-5">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Job Description</FormLabel>
                  <GenerateJobDescriptionButton
                    jobData={jobData}
                    onDescriptionGenerated={(description) => {
                      setAiDescription(description);
                    }}
                  />
                </div>
                <FormControl>
                  <CustomTipTapEditor aiContent={aiDescription} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This is an OpenAI-powered job description. It uses the job title and
          your location. By using the content, you adopt it as your own and are
          responsible for its accuracy.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default JobDescriptionForm;

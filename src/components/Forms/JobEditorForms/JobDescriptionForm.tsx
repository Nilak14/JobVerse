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
import JobDescriptionEditor from "@/components/tiptap/CustomTipTapEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDescription } from "@/lib/test";
import CustomTipTapEditor from "@/components/tiptap/CustomTipTapEditor";

const JobDescriptionForm = ({
  currentStep,
  jobData,
  setJobData,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const [aiDescription, setAiDescription] = useState<any | null>(null);
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

  useEffect(() => {
    if (aiDescription) {
      form.setValue("description", aiDescription);
    }
  }, [aiDescription, setAiDescription]);

  return (
    <div className="max-w-[90%] mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Job Description</h2>
        <p className="text-sm text-muted-foreground">
          Describe the job role and responsibilities
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Job Description</FormLabel>
                  <Button
                    onClick={() => {
                      setAiDescription(getDescription());
                    }}
                    type="button"
                    variant={"secondary"}
                    size={"icon"}
                  >
                    <Brain />
                  </Button>
                </div>
                <FormControl>
                  <CustomTipTapEditor field={field} />
                  {/* <JobDescriptionEditor field={field} /> */}
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

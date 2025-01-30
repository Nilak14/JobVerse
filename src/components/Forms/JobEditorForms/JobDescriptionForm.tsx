import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Currency, CurrencySelect } from "@/components/ui/currency-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import {
  JobBenefits,
  SalaryRate,
  SalaryType,
} from "@/lib/enums/CreateJobEnums";
import { useForm } from "react-hook-form";
import { getSafeSymbolFromCurrency } from "country-data-list";
import { useFormTriggersStore } from "@/store/useFormTriggersStore";
import { JobEditorFormProps } from "@/lib/types";
import CreateJobTags from "@/components/Job/CreateJobTags";
import { JobDescriptionSchemaType } from "@/schema/CreateJobSchema";

const JobDescriptionForm = ({
  currentStep,
  jobData,
  setJobData,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const [showRangeSalary, setShowRangeSalary] = React.useState(true);

  const form = useForm<JobDescriptionSchemaType>({
    defaultValues: {
      description: jobData.description || "",
    },
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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Job Description</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the salary details and benefits offered for the job
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6"></form>
      </Form>
    </div>
  );
};

export default JobDescriptionForm;

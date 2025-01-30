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
import {
  JobBenefitsSchema,
  JobBenefitsSchemaType,
} from "@/schema/CreateJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const JobBenefitsForm = ({
  currentStep,
  jobData,
  setJobData,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const [showRangeSalary, setShowRangeSalary] = React.useState(true);

  const form = useForm<JobBenefitsSchemaType>({
    defaultValues: {
      salaryType: jobData.salaryType || "Range",
      amount: jobData.amount || null,
      maxSalaryAmount: jobData.maxSalaryAmount || null,
      minSalaryAmount: jobData.minSalaryAmount || null,
      salaryCurrency: jobData.salaryCurrency || "",
      salaryRate: jobData.salaryRate || "",
      benefits: jobData.benefits || [],
    },
    resolver: zodResolver(JobBenefitsSchema),
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
        benefits:
          values.benefits?.filter((benefit): benefit is string => !!benefit) ||
          [],
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
        <h2 className="text-2xl font-semibold">Job Benefits</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the salary details and benefits offered for the job
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <motion.div variants={fadeIn} className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="salaryCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Currency</FormLabel>
                    <FormControl>
                      <CurrencySelect
                        onValueChange={field.onChange}
                        onCurrencySelect={useCallback(
                          (e: Currency) => {
                            form.setValue("salaryCurrency", e.code);
                            form.trigger();
                          },
                          [form]
                        )}
                        placeholder="Select currency"
                        disabled={false}
                        currencies="all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salaryRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Rate</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select salary type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SalaryRate.map((rate) => (
                          <SelectItem key={rate} value={rate}>
                            Per {rate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="salaryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Show Pay By</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        setShowRangeSalary(e === "Range");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select salary type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SalaryType.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                animate={{ height: "auto" }}
                initial={false}
                className="space-y-4"
              >
                {showRangeSalary ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Label className="font-semibold">Minimum</Label>
                      <Label className="font-semibold">Maximum</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minSalaryAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                startIcon={() => (
                                  <span className="text-primary">
                                    {getSafeSymbolFromCurrency(
                                      form.watch("salaryCurrency")
                                    )}
                                  </span>
                                )}
                                {...field}
                                value={field.value ?? ""}
                                type="number"
                                placeholder="Min amount"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="maxSalaryAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                startIcon={() => (
                                  <span className="text-primary">
                                    {getSafeSymbolFromCurrency(
                                      form.watch("salaryCurrency")
                                    )}
                                  </span>
                                )}
                                {...field}
                                value={field.value ?? ""}
                                type="number"
                                placeholder="Max amount"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            startIcon={() => (
                              <span className="text-primary">
                                {getSafeSymbolFromCurrency(
                                  form.watch("salaryCurrency")
                                )}
                              </span>
                            )}
                            {...field}
                            value={field.value ?? ""}
                            type="number"
                            placeholder="Enter amount"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </motion.div>
            </div>
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>Benefits Offered</FormLabel>
                  <FormControl>
                    <motion.div
                      className="flex flex-wrap gap-4"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {JobBenefits.map((benefit) => (
                        <motion.button
                          layout
                          onClick={() => {
                            if (field.value.includes(benefit)) {
                              field.onChange(
                                field.value.filter((b) => b !== benefit)
                              );
                              return;
                            }
                            field.onChange([...field.value, benefit]);
                          }}
                          key={benefit}
                          type="button"
                          className="focus:outline-none"
                        >
                          <CreateJobTags
                            isSelected={field.value.includes(benefit)}
                            label={benefit}
                          />
                        </motion.button>
                      ))}
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default JobBenefitsForm;

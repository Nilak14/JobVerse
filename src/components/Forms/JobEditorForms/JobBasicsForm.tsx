import { jobBasicsSchema, jobBasicsSchemaType } from "@/schema/CreateJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { JobEditorFormProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { jobTypes, workMode } from "@/lib/enums/CreateJobEnums";
import { useFormTriggersStore } from "@/store/useFormTriggersStore";
import { Label } from "@/components/ui/label";
import { cn, parseLatLng } from "@/lib/utils";
import { Building, Building2, Home } from "lucide-react";
import Map from "@/components/Global/Radar/Map";
import { RadarAddress } from "radar-sdk-js/dist/types";
const JobBasicsForm = ({
  jobData,
  setJobData,
  currentStep,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const [showLocationField, setShowLocationField] = useState(false);
  const [address, setAddress] = useState<RadarAddress | null>(null);
  const form = useForm<jobBasicsSchemaType>({
    defaultValues: {
      title: jobData.title || "",
      jobType: jobData.jobType || "",
      workMode: jobData.workMode || "Remote",
      location: jobData.location || "",
      latitude: jobData.latitude || "",
      longitude: jobData.longitude || "",
    },
    resolver: zodResolver(jobBasicsSchema),
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
  }, [form, jobData, setJobData, setShowLocationField, showLocationField]);

  useEffect(() => {
    if (
      jobData.workMode === "Remote" ||
      form.getValues("workMode") === "Remote"
    ) {
      setShowLocationField(false);
    } else {
      setShowLocationField(true);
    }
  }, []);
  useEffect(() => {
    console.log(address);
    if (address) {
      form.setValue("latitude", address.latitude.toString());
      form.setValue("longitude", address.longitude.toString());
      form.setValue("location", address.addressLabel);
    }
  }, [address]);

  const getIcon = (mode: string) => {
    switch (mode) {
      case "On-site":
        return <Building2 className="w-6 h-6" />;
      case "Remote":
        return <Home className="w-6 h-6" />;
      case "Hybrid":
        return <Building className="w-6 h-6" />;
      default:
        return null;
    }
  };
  return (
    <div className="max-w-xl mx-auto space-y-6 pt-5">
      <Form {...form}>
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: Sales Manager" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobTypes.map((type) => (
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
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <Label>Work Mode</Label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workMode.map((mode, index) => (
                <FormField
                  key={mode}
                  control={form.control}
                  name="workMode"
                  render={({ field }) => {
                    const isSelected = field.value === mode;

                    return (
                      <FormItem>
                        <FormControl>
                          <motion.button
                            type="button"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              "w-full p-4 rounded-xl border-2 transition-colors duration-200",
                              "hover:border-primary/50",
                              "focus:outline-none focus:ring-2 focus:ring-primary/20",
                              "relative overflow-hidden",
                              isSelected
                                ? "border-primary"
                                : "border-muted-foreground/20"
                            )}
                            onClick={() => {
                              form.trigger("location");
                              const newValue = isSelected ? "" : mode;
                              field.onChange(newValue);

                              const showLocation =
                                newValue === "On-site" || newValue === "Hybrid";
                              setShowLocationField(showLocation);

                              if (mode === "Remote") {
                                form.setValue("location", "");
                              }
                            }}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="highlight"
                                className="absolute inset-0 bg-primary/10 dark:bg-primary/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}

                            <div className="relative flex items-center gap-4">
                              <motion.div
                                className={cn(
                                  "p-3 rounded-lg",
                                  isSelected
                                    ? "text-primary bg-primary/20"
                                    : "text-muted-foreground bg-muted/30"
                                )}
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                {getIcon(mode)}
                              </motion.div>

                              <FormLabel
                                className={cn(
                                  "font-medium cursor-pointer",
                                  isSelected
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                )}
                              >
                                <motion.span
                                  animate={{ scale: isSelected ? 1.05 : 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  {mode}
                                </motion.span>
                              </FormLabel>
                            </div>
                          </motion.button>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            {form.formState.errors.workMode?.message && (
              <p className="text-xs text-destructive">
                {form.formState.errors.workMode.message}
              </p>
            )}
          </motion.div>
          {showLocationField && (
            <div className="pb-10">
              <Map
                onAddressChange={setAddress}
                defaultLat={parseLatLng(jobData.latitude!) || 40.7342}
                defaultLng={parseLatLng(jobData.longitude!) || -73.9911}
                className="w-[80%] h-[400px]"
              />
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
export default JobBasicsForm;

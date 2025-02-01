import {
  JobDetailsSchema,
  JobDetailsSchemaType,
} from "@/schema/CreateJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { JobEditorFormProps } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { useFormTriggersStore } from "@/store/useFormTriggersStore";
import { useJobCategory } from "@/store/useJobCategory";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Sparkles } from "lucide-react";
import { SubCategory } from "@prisma/client";
import LinkButtonAnimated from "@/components/ui/animated-button-link";
import { Skeleton } from "@/components/ui/skeleton";

const JobDetailsForm = ({
  jobData,
  setJobData,
  currentStep,
}: JobEditorFormProps) => {
  const { setTrigger } = useFormTriggersStore();
  const { category, isLoading } = useJobCategory();

  const mainCategory = useMemo(
    () =>
      category
        ? category.map((cat) => {
            return {
              id: cat.id,
              name: cat.name,
            };
          })
        : [],
    [category]
  );

  const [subCategoryArray, setSubCategoryArray] = useState<SubCategory[]>([]);

  const form = useForm<JobDetailsSchemaType>({
    defaultValues: {
      experienceLevel: jobData.experienceLevel || "",
      category: jobData.category || "",
      subCategory: jobData.subCategory || "",
      totalHeads: jobData.totalHeads || "",
    },
    resolver: zodResolver(JobDetailsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (form.watch("category")) {
      const selectedCategory = category.find(
        (cat) => cat.id === form.watch("category")
      );
      if (selectedCategory) {
        setSubCategoryArray(selectedCategory.subcategories || []);
      }
    }
  }, [form.watch("category"), category]);

  useEffect(() => {
    setTrigger(currentStep, form.trigger);
  }, [form.trigger, setTrigger]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setJobData({ ...jobData, ...values });
    });
    return unsubscribe;
  }, [form, jobData, setJobData]);

  return (
    <div className="max-w-[75%] mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Job Details</h2>
        <p className="text-sm text-muted-foreground">
          Enter the Details for the Job
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-5">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"> */}
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Experience Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">No Experience Needed</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Job Category</FormLabel>
                  {isLoading ? (
                    <Skeleton className="h-9 w-full" />
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              " justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? mainCategory.find(
                                  (cat) => cat.id === field.value
                                )?.name
                              : "Select Job Category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Job Category..." />
                          <CommandList>
                            <CommandEmpty>No Category found.</CommandEmpty>
                            <CommandGroup>
                              {mainCategory.map((cat) => (
                                <CommandItem
                                  value={cat.name}
                                  key={cat.id}
                                  onSelect={() => {
                                    form.setValue("category", cat.id);
                                    form.trigger("category");
                                  }}
                                >
                                  {cat.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      cat.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sub Category</FormLabel>
                  {isLoading ? (
                    <Skeleton className="h-9 w-full" />
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              " justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? subCategoryArray.find(
                                  (cat) => cat.id === field.value
                                )?.name
                              : "Select Sub Category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Sub Category..." />
                          <CommandList>
                            <CommandEmpty>No Sub Category found.</CommandEmpty>
                            <CommandGroup>
                              {subCategoryArray.map((cat) => (
                                <CommandItem
                                  value={cat.name}
                                  key={cat.id}
                                  onSelect={() => {
                                    form.setValue("subCategory", cat.id);
                                    form.trigger("subCategory");
                                  }}
                                >
                                  {cat.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      cat.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                  <FormDescription>Select the Category First</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="totalHeads"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Number of People To Hire</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Total Number of Openings" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* </div> */}
        </form>
      </Form>
      <div className=" text-muted-foreground text-center absolute bottom-3 right-2 flex gap-1 flex-col">
        <p className="text-xs">Missing a Category?</p>
        <LinkButtonAnimated>
          <div className="flex items-center gap-2 cursor-pointer text-sm">
            <Sparkles className="h-4 w-4 inline-block text-yellow-500" />
            <span>Request New Category</span>
          </div>
        </LinkButtonAnimated>
      </div>
    </div>
  );
};
export default JobDetailsForm;

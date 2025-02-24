import { ResumeEditorFormProps } from "@/lib/types";
import {
  workExperienceSchema,
  WorkExperienceValues,
} from "@/schema/ResumeEditorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import ResumeEditorFormShell from "./ResumeEditorFormShell";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WorkExperienceForm = ({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) => {
  const form = useForm<WorkExperienceValues>({
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
    resolver: zodResolver(workExperienceSchema),
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences: values.workExperiences?.filter(
          (exp) => exp !== undefined
        ),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <ResumeEditorFormShell
      title="Work Experience"
      description="Add as many work experiences as you want"
    >
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <WorkExperienceItem
              form={form}
              index={index}
              remove={remove}
              key={field.id}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                append({
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                });
              }}
            >
              Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </ResumeEditorFormShell>
  );
};
export default WorkExperienceForm;

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceItem({ form, index, remove }: WorkExperienceItemProps) {
  return (
    <div className="space-y-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal className="cursor-move size-5 text-muted-foreground" />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter Job Title" {...field} autoFocus />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormDescription>
        <span className="font-semibold">
          Leave end Date Empty if you are currently working here
        </span>
      </FormDescription>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea className="resize-none" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        variant={"destructive"}
        type="button"
        onClick={() => remove(index)}
      >
        Remove
      </Button>
    </div>
  );
}

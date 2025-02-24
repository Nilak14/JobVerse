import { ResumeEditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/schema/ResumeEditorSchema";
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

const EducationForm = ({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) => {
  const form = useForm<EducationValues>({
    defaultValues: {
      educations: resumeData.educations || [],
    },
    resolver: zodResolver(educationSchema),
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((edu) => edu !== undefined),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <ResumeEditorFormShell
      title="Education"
      description="Add as many education as you want"
    >
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationItem
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
                  degree: "",
                  endDate: "",
                  school: "",
                  startDate: "",
                });
              }}
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </ResumeEditorFormShell>
  );
};
export default EducationForm;

interface WorkExperienceItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

function EducationItem({ form, index, remove }: WorkExperienceItemProps) {
  return (
    <div className="space-y-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal className="cursor-move size-5 text-muted-foreground" />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
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
          name={`educations.${index}.endDate`}
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

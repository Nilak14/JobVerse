import { ResumeEditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/schema/ResumeEditorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ResumeEditorFormShell from "./ResumeEditorFormShell";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const SkillsForm = ({ resumeData, setResumeData }: ResumeEditorFormProps) => {
  const form = useForm<SkillsValues>({
    defaultValues: {
      skills: resumeData.skills || [],
    },
    resolver: zodResolver(skillsSchema),
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <ResumeEditorFormShell title="Skills" description="What Are you good at ?">
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none min-h-48"
                    {...field}
                    placeholder="React, Next.js, Tailwind CSS, Prisma, Postgres"
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      field.onChange(skills);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each skill with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ResumeEditorFormShell>
  );
};
export default SkillsForm;

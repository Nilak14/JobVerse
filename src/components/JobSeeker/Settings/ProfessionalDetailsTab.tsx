import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ProfessionalDetailsSchema,
  ProfessionalDetailsSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Award, FileText, GraduationCap, Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
const ProfessionalDetailsTab = () => {
  const form = useForm<ProfessionalDetailsSchemaType>({
    defaultValues: {
      bio: "",
      designation: "",
      education: [],
      skills: [],
      workExperience: [],
      certifications: [],
    },
    mode: "onChange",
    resolver: zodResolver(ProfessionalDetailsSchema),
  });
  const [newSkill, setNewSkill] = useState<string>("");

  const addSkill = () => {
    const existingSkills = form.getValues("skills");
    if (newSkill && !existingSkills.includes(newSkill)) {
      form.setValue("skills", [...existingSkills, newSkill]);
      setNewSkill("");
    }
  };
  const removeSkill = (skill: string) => {
    const existingSkills = form.getValues("skills");
    form.setValue(
      "skills",
      existingSkills.filter((s) => s !== skill)
    );
    console.log(form.getValues("skills"));
  };

  const onSubmit = (data: ProfessionalDetailsSchemaType) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Details</CardTitle>
        <CardDescription>
          Showcase your skills, experience, and career preferences
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Current Job Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none min-h-28"
                      placeholder="Enter your Professional Details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.watch("skills").map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-primary/10 text-primary hover:bg-primary/20 cursor-default flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 rounded-full hover:bg-primary/10 p-0.5"
                    >
                      <Trash className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="relative w-full h-10 flex flex-col ">
                <div className="relative h-full z-10 rounded-md">
                  <Input
                    placeholder="Enter Your Skills"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.stopPropagation();
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />

                  <Button
                    type="button"
                    size="sm"
                    onClick={addSkill}
                    className="absolute right-0 inset-y-0 h-full rounded-l-none"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Work Experience
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="mr-1 h-4 w-4" /> Add Experience
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                  Education
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="mr-1 h-4 w-4" /> Add Education
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Certifications
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="mr-1 h-4 w-4" /> Add Certifications
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default ProfessionalDetailsTab;

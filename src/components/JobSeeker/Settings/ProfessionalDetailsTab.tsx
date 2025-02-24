"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ProfessionalDetailsSchema,
  ProfessionalDetailsSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import WorkExperienceDNDForm from "./WorkExperienceDNDForm";
import AddEducationDNDForm from "./AddEducationDNDForm";
import AddCertificationDNDForm from "./AddCertificationDNDForm";
import { JobSeekerProfileComponentProps } from "@/lib/types";
import BlockLoader from "@/components/ui/block-loader";
import { toast } from "sonner";
import { professionalDetailsSettings } from "@/actions/settings/professionalDetailsSettings";
import LoadingButton from "@/components/ui/loading-button";
const ProfessionalDetailsTab = ({
  profile,
}: JobSeekerProfileComponentProps) => {
  const form = useForm<ProfessionalDetailsSchemaType>({
    defaultValues: {
      education: profile.JOB_SEEKER?.JobSeekerProfile?.Education || [],
      skills: profile.JOB_SEEKER?.JobSeekerProfile?.skills || [],
      workExperience:
        profile.JOB_SEEKER?.JobSeekerProfile?.WorkExperience || [],
      certifications: profile.JOB_SEEKER?.JobSeekerProfile?.Certification || [],
    },
    mode: "onChange",
    resolver: zodResolver(ProfessionalDetailsSchema),
  });
  const [newSkill, setNewSkill] = useState<string>("");
  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);
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
  };
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: ProfessionalDetailsSchemaType) => {
    console.log("hi");

    setLoading(true);
    try {
      const workExperienceWithOrder = data.workExperience.map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );
      const educationWithOrder = data.education.map((item, index) => ({
        ...item,
        order: index,
      }));
      const certificationsWithOrder = data.certifications.map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );
      const updatedData = {
        ...data,
        workExperience: workExperienceWithOrder,
        education: educationWithOrder,
        certifications: certificationsWithOrder,
      };
      const res = await professionalDetailsSettings(updatedData);
      if (res.success) {
        toast.success(res.message, { id: "professional-details" });
      } else {
        toast.error(res.message, { id: "professional-details" });
      }
    } catch (error) {
      toast.error("Failed to update professional details", {
        id: "professional-details",
      });
    } finally {
      setLoading(false);
    }
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optionally, you can render a placeholder or nothing until mounted
    return null;
  }
  return (
    <Card className="relative">
      <BlockLoader isLoading={loading} textContent="Updating" />
      <CardHeader>
        <CardTitle>Professional Details</CardTitle>
        <CardDescription>
          Showcase your skills, experience, and career preferences
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
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

            <WorkExperienceDNDForm form={form} />
            <AddEducationDNDForm form={form} />
            <AddCertificationDNDForm form={form} />
          </CardContent>
          <CardFooter>
            <div className="w-full  flex justify-end gap-4 ">
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
              <LoadingButton loading={loading} showIconOnly type="submit">
                Save Changes
              </LoadingButton>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default ProfessionalDetailsTab;

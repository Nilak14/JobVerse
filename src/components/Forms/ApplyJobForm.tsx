import { JobDataBrowse, JobDataDescription } from "@/lib/prisma-types/Job";
import { JobSeekerProfileApplication } from "@/lib/prisma-types/JobSeekerProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ApplyJobSchema, ApplyJobSchemaType } from "@/schema/ApplyJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponsiveModalFooter } from "../ui/responsive-dailog";
import LoadingButton from "../ui/loading-button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
interface ApplyJobFormProps {
  jobData: JobDataBrowse | JobDataDescription;
  jobSeekerProfile: JobSeekerProfileApplication;
  setOpenModal: (value: boolean) => void;
}
const ApplyJobForm = ({
  jobData,
  jobSeekerProfile,
  setOpenModal,
}: ApplyJobFormProps) => {
  const createdResume = jobSeekerProfile.JOB_SEEKER?.createdResumes || [];
  const uploadedResume = jobSeekerProfile.JOB_SEEKER?.uploadedResumes || [];
  const userResume = createdResume.concat(uploadedResume);
  const form = useForm<ApplyJobSchemaType>({
    resolver: zodResolver(ApplyJobSchema),
    defaultValues: {
      resumeId: "",
      jobSeekerId: jobSeekerProfile.JOB_SEEKER?.id,
    },
    mode: "onChange",
  });
  const handleApplicationSubmit = async (data: ApplyJobSchemaType) => {
    if (jobData.resumeRequired && !data.resumeId) {
      form.setError("resumeId", {
        type: "manual",
        message: "Please select a resume to continue",
      });
      return;
    }
  };
  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(handleApplicationSubmit)}
      >
        <FormField
          control={form.control}
          name="resumeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Select Resume{" "}
                <span className="text-xs font-semibold text-muted-foreground">
                  ({jobData.resumeRequired ? "Required" : "Optional"})
                </span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userResume.length <= 0 ? (
                    <div className="flex flex-col items-center gap-4 text-center my-2">
                      <div className="rounded-full bg-primary/15 p-3">
                        <PlusCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium ">No resumes found</h3>
                        <p className="text-sm text-muted-foreground ">
                          You don't have any resumes yet. Create one to get
                          started.
                        </p>
                      </div>
                      <Button asChild size="sm">
                        <Link href="/job-seeker/design-studio/resume">
                          Create Resume
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      {userResume.map((resume) => (
                        <SelectItem
                          className="py-2"
                          key={resume.id}
                          value={resume.id}
                        >
                          {resume.title || "Untitled Resume"}{" "}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <ResponsiveModalFooter>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={() => setOpenModal(false)}
            className="w-full mb-5 md:mb-0"
            variant={"secondary"}
          >
            Cancel
          </Button>
          <LoadingButton
            showIconOnly
            loading={form.formState.isSubmitting}
            // onClick={() => saveJobAs(JobStatus.PENDING)}
            className="w-full mb-5 md:mb-0"
          >
            Apply
          </LoadingButton>
        </ResponsiveModalFooter>
      </form>
    </Form>
  );
};
export default ApplyJobForm;

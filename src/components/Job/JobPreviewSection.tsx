import { cn } from "@/lib/utils";
import { JobSchemaType } from "@/schema/CreateJobSchema";
import JobEmployerPreview from "./JobEmployerPreview";

interface JobPreviewSectionProps {
  jobData: JobSchemaType;
  className?: string;
}
const JobPreviewSection = ({ jobData, className }: JobPreviewSectionProps) => {
  return (
    <section
      className={cn(
        "group relative hidden md:w-1/2 md:flex w-full overflow-y-auto  ",
        className
      )}
    >
      <JobEmployerPreview job={jobData} />
    </section>
  );
};
export default JobPreviewSection;

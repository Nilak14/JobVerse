import { cn } from "@/lib/utils";
import { JobSchemaType } from "@/schema/CreateJobSchema";

interface JobPreviewSectionProps {
  jobData: JobSchemaType;
  setJobData: (data: JobSchemaType) => void;
  className?: string;
}
const JobPreviewSection = ({
  jobData,
  setJobData,
  className,
}: JobPreviewSectionProps) => {
  return (
    <section
      className={cn(
        "group relative hidden md:w-1/2 md:flex w-full overflow-hidden",
        className
      )}
    >
      <pre>{JSON.stringify(jobData, null, 2)}</pre>
    </section>
  );
};
export default JobPreviewSection;

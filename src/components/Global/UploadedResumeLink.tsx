import { getUserUploadedResume } from "@/hooks/query-hooks/getUploadedResume";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface UploadedResumeLinkProps {
  resumeId: string;
  className?: string;
}
const UploadedResumeLink = ({
  resumeId,
  className,
}: UploadedResumeLinkProps) => {
  const { data, isLoading } = getUserUploadedResume(resumeId);
  console.log(data);
  if (isLoading) {
    return <Skeleton className="w-full h-5" />;
  }
  return (
    <Link className={cn(className)} href={data.resumeUrl} target="_blank">
      View Resume
    </Link>
  );
};
export default UploadedResumeLink;

import { getUserUploadedResume } from "@/hooks/query-hooks/getUploadedResume";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface UploadedResumeLinkProps extends PropsWithChildren {
  resumeId: string;
  className?: string;
}
const UploadedResumeLink = ({
  resumeId,
  className,
  children,
}: UploadedResumeLinkProps) => {
  const { data, isLoading } = getUserUploadedResume(resumeId);
  if (isLoading) {
    return <Skeleton className="w-full h-5" />;
  }
  return (
    <Link
      className={cn(className)}
      href={data?.resumeUrl || "not-found"}
      target="_blank"
    >
      {children}
    </Link>
  );
};
export default UploadedResumeLink;

import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import { isCreatedResume } from "@/lib/utils";
import Link from "next/link";
import UploadedResumeLink from "../Global/UploadedResumeLink";
interface ApplicationEmployerDropdownActionProps {
  application: JobApplicationEmployer;
}
const ApplicationEmployerDropdownAction = ({
  application,
}: ApplicationEmployerDropdownActionProps) => {
  const userResume = application.resumeId;
  const isResumeCreated = isCreatedResume(userResume || "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {application.jobSeeker.JobSeekerProfile?.profileVisibility && (
          <DropdownMenuItem>View Profile</DropdownMenuItem>
        )}
        {application.resumeId && (
          <DropdownMenuItem asChild>
            {isResumeCreated ? (
              <Link
                target="_blank"
                href={`/resume/preview/${application.resumeId}`}
              >
                View Resume
              </Link>
            ) : (
              <UploadedResumeLink
                className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-muted"
                resumeId={application.resumeId}
              />
            )}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Move To Interviewing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">
          Reject Application
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ApplicationEmployerDropdownAction;

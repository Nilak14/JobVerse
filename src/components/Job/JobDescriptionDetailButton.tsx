"use client";

import { JobDataDescription } from "@/lib/prisma-types/Job";
import SaveJobButton from "../Global/SaveJobButton";
import { Session } from "next-auth";
import ApplyNowButton from "../Global/ApplyNowButton";
import JobShareButton from "../Global/JobShareButton";

interface JobDescriptionDetailButtonProps {
  job: JobDataDescription;
  session: Session;
}
const JobDescriptionDetailButton = ({
  job,
  session,
}: JobDescriptionDetailButtonProps) => {
  if (session.user.type !== "JOB_SEEKER" || job.status !== "ACTIVE")
    return <></>;
  return (
    <>
      <ApplyNowButton jobData={job} className="w-full" size={"lg"} />

      <div className="flex gap-2">
        <SaveJobButton
          jobId={job.id}
          initialState={{
            isSavedByUser: job.saved.some(
              (s) => s.user.userId === session.user.id
            ),
          }}
          withText
          className="border border-input bg-background shadow-sm hover:bg-accent  flex-1 inline-flex items-center justify-center gap-2  active:scale-95 transition-all duration-300 whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        />
        <JobShareButton jobId={job.id} />
      </div>
    </>
  );
};
export default JobDescriptionDetailButton;

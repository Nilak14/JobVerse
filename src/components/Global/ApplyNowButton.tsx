"use client";
import { useMemo, useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import LoadingButton from "../ui/loading-button";
import { getJobSeekerProfile } from "@/hooks/query-hooks/getJobSeekerProfile";
import { Skeleton } from "../ui/skeleton";
import { cn, formatDate } from "@/lib/utils";
import { JobDataBrowse, JobDataDescription } from "@/lib/prisma-types/Job";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

import ApplyJobForm from "../Forms/ApplyJobForm";

interface ApplyNowButtonProps extends ButtonProps {
  jobData: JobDataBrowse | JobDataDescription;
}
const ApplyNowButton = ({ jobData, ...props }: ApplyNowButtonProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, isLoading } = getJobSeekerProfile();
  if (isLoading) {
    return <Skeleton className={cn("px-3 w-[86px] h-9", props.className)} />;
  }
  if (!data?.data) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} {...props}>
        Apply Now
      </Button>
      <ResponsiveModal open={openModal} onOpenChange={setOpenModal}>
        <ResponsiveModalContent isloading={undefined}>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>
              Apply For {jobData.title} ?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Complete the form below to apply for this position at{" "}
              {jobData.company.name}
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Alert className="my-3" variant={"info"}>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please make sure your profile is up to date before moving ahead.
              Your data from your profile will be used to apply for this job.
            </AlertDescription>
          </Alert>
          <ApplyJobForm
            setOpenModal={setOpenModal}
            jobData={jobData}
            jobSeekerProfile={data.data}
          />
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};
export default ApplyNowButton;

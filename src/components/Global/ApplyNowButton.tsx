"use client";
import { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import { getJobSeekerProfile } from "@/hooks/query-hooks/getJobSeekerProfile";
import { Skeleton } from "../ui/skeleton";
import { cn, getTimeDifference, jobSeekerProfileStatus } from "@/lib/utils";
import { JobDataBrowse, JobDataDescription } from "@/lib/prisma-types/Job";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, UserCircle } from "lucide-react";

import ApplyJobForm from "../Forms/ApplyJobForm";
import { JobSeekerProfileApplication } from "@/lib/prisma-types/JobSeekerProfile";
import Link from "next/link";

interface ApplyNowButtonProps extends ButtonProps {
  jobData: JobDataBrowse | JobDataDescription;
}
const ApplyNowButton = ({ jobData, ...props }: ApplyNowButtonProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openProfileModal, setProfileModal] = useState<boolean>(false);
  const { data, isLoading } = getJobSeekerProfile();
  const [isApplying, setIsApplying] = useState<boolean>(false);
  if (isLoading) {
    return <Skeleton className={cn("px-3 w-[86px] h-9", props.className)} />;
  }
  if (!data?.data) {
    return null;
  }
  const jobSeekerData = data.data as JobSeekerProfileApplication;
  const daysLeft = getTimeDifference(jobData.deadline!);
  const hasUserApplied = jobSeekerData.JOB_SEEKER?.applications.some(
    (application) => application.jobId === jobData.id
  );
  const isUserProfileCompleted = jobSeekerProfileStatus(jobSeekerData);
  const handleClick = () => {
    if (hasUserApplied) return;
    if (!isUserProfileCompleted.completed) {
      setProfileModal(true);
      return;
    }

    setOpenModal(true);
  };
  return (
    <>
      <Button
        disabled={!daysLeft}
        variant={hasUserApplied ? "outline" : "default"}
        onClick={handleClick}
        {...props}
      >
        {hasUserApplied ? "Applied" : "Apply Now"}
      </Button>
      <ApplyModal
        jobData={jobData}
        open={openModal}
        setOpen={setOpenModal}
        jobSeekerProfile={jobSeekerData}
        loading={isApplying}
        setLoading={setIsApplying}
      />
      <CompleteProfileModal open={openProfileModal} setOpen={setProfileModal} />
    </>
  );
};
export default ApplyNowButton;
interface ApplyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  jobData: JobDataBrowse | JobDataDescription;
  jobSeekerProfile: JobSeekerProfileApplication;
  loading: boolean;
  setLoading: (value: boolean) => void;
}
const ApplyModal = ({
  jobData,
  jobSeekerProfile,
  loading,
  open,
  setLoading,
  setOpen,
}: ApplyModalProps) => {
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent isloading={loading ? "true" : undefined}>
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
          setLoading={setLoading}
          setOpenModal={setOpen}
          jobData={jobData}
          jobSeekerProfile={jobSeekerProfile}
          loading={loading}
        />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
interface CompleteProfileModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CompleteProfileModal = ({ open, setOpen }: CompleteProfileModalProps) => {
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Complete Your Profile</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            You need to complete your profile before applying for jobs.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Alert className="my-3" variant={"warning"}>
          <UserCircle className="size-5" />
          <AlertTitle className="font-bold text-lg">
            Profile Incomplete
          </AlertTitle>
          <AlertDescription>
            <div>
              <p className="text-sm  mb-3">
                We noticed your profile is not complete. To apply for jobs, you
                need to:
              </p>
              <ul className="text-sm  space-y-1 mb-3">
                <li>• Upload your resume</li>
                <li>• Complete your work experience</li>
                <li>• Add your skills</li>

                <li>• Add Education</li>
              </ul>
              <p className="text-sm ">
                A complete profile increases your chances of being noticed by
                employers.
              </p>
            </div>
          </AlertDescription>
        </Alert>
        <ResponsiveModalFooter>
          <div className="flex items-start gap-5 w-full">
            <Button
              onClick={() => setOpen(false)}
              className="flex-1"
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button asChild className="flex-1">
              <Link href="/job-seeker/settings/account-settings?tab=professional-details">
                Complete Profile
              </Link>
            </Button>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

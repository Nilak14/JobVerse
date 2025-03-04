"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Briefcase, Eye, LucideIcon, MoreHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dispatch, SetStateAction, useState } from "react";
import { JobApplication } from "@/lib/prisma-types/Application";
import UserAvatar from "../Global/Useravatar";
import { formatDate, renderSalaryText } from "@/lib/utils";
import ApplicationStatusBadge from "../Global/ApplicationStatusBadge";
import Link from "next/link";
import {
  Timeline,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "../ui/timeline";

interface JobTableRowActionProps {
  application: JobApplication;
  TriggerIcon?: LucideIcon;
}

const ApplicationTableAction = ({
  application,
  TriggerIcon = MoreHorizontal,
}: JobTableRowActionProps) => {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center"
          asChild
        >
          <button className="h-8 w-8 p-0 outline-none border-none ring-0">
            <span className="sr-only">Open menu</span>
            <TriggerIcon className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenSheet(true)}>
            <Eye color="#3b82f6 " className="h-4 w-4 mr-2 " />
            <span className="text-xs">View More</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/job/description/${application.job.id}`}>
              <Briefcase color="#f97316  " className="h-4 w-4 mr-2 " />
              <span className="text-xs">View Job</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ApplicationViewSheet
        application={application}
        open={openSheet}
        setOpen={setOpenSheet}
      />
    </>
  );
};
export default ApplicationTableAction;

interface ApplicationViewSheetProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  application: JobApplication;
}
const ApplicationViewSheet = ({
  setOpen,
  open,
  application,
}: ApplicationViewSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-4">
            <UserAvatar
              imageUrl={application.job.company.logoUrl!}
              userName={application.job.company.name!}
            />
            <div>
              <SheetTitle>{application.job.title}</SheetTitle>
              <p className="text-sm text-muted-foreground">
                {application.job.company.name}
              </p>
            </div>
          </div>
        </SheetHeader>
        <section className="overflow-y-auto h-[calc(100vh-8rem)]">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Location
                </h4>
                <p>{application.job.workMode}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Job Type
                </h4>
                <p>{application.job.jobType}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Salary Range
                </h4>
                <p>
                  {renderSalaryText({
                    displayType: application.job.Salary?.type as
                      | "Maximum"
                      | "Starting"
                      | "Range"
                      | "Exact"
                      | null,
                    currency: application.job?.Salary?.currency,
                    exactAmount: application.job?.Salary?.amount,
                    maxAmount: application.job?.Salary?.maxAmount,
                    startingAmount: application?.job?.Salary?.minAmount,
                  })}
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / {application.job.Salary?.rate}
                  </span>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Applied On
                </h4>
                <p>{formatDate(application.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Current Status
            </h4>
            <div className="flex items-center gap-2">
              <ApplicationStatusBadge status={application.status} />
            </div>
          </div>
          <div>
            <Timeline className="mt-8">
              <TimelineItem>
                <TimelineHeader>
                  <TimelineTime>
                    {formatDate(application.createdAt)}
                  </TimelineTime>
                  <TimelineTitle className="text-sm text-black dark:text-white">
                    Application Submitted
                  </TimelineTitle>
                </TimelineHeader>
              </TimelineItem>
              {application.ApplicationReview.map((review) => {
                return (
                  <TimelineItem key={review.id}>
                    <TimelineHeader>
                      <TimelineTime>
                        {formatDate(review.reviewedAt)}
                      </TimelineTime>
                      <TimelineTitle className="text-sm text-black dark:text-white">
                        {review.reviewedStatus}
                      </TimelineTitle>
                    </TimelineHeader>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </div>
        </section>
        {/* <SheetFooter className="mt-2  w-full flex gap-10">
          <Button variant={"secondary"} className="flex-1" type="submit">
            View Submitted Resume
          </Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

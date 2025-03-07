"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  Clock,
  DollarSign,
  Eye,
  History,
  Info,
  LucideIcon,
  MapPin,
  MoreHorizontal,
  Phone,
  Printer,
  Users,
  Video,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
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
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ApplicationStatus, InterviewType } from "@prisma/client";
import { Button } from "../ui/button";

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
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader className="space-y-4 pb-4 border-b">
          <div className="flex items-center gap-4">
            <UserAvatar
              imageUrl={application.job.company.logoUrl!}
              userName={application.job.company.name!}
            />
            <div className="space-y-1">
              <SheetTitle className="font-semibold">
                {application.job.title}
              </SheetTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {application.job.company.name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {application.job.workMode}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {application.job.jobType}
            </Badge>
          </div>
        </SheetHeader>

        <section className="overflow-y-auto pt-4 pb-8">
          <div className="space-y-6">
            {/* Application Status Card */}
            <Card
              className="border-l-4"
              style={{ borderLeftColor: getStatusColor(application.status) }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Current Status</h3>
                    <ApplicationStatusBadge status={application.status} />
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-medium mb-1">Applied On</h3>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(application.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">
                    Salary
                  </h4>
                  <p className="text-sm font-medium flex items-center gap-1 whitespace-nowrap">
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
                    <span className="text-xs text-muted-foreground">
                      / {application.job.Salary?.rate}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Interview Details */}
            {application.Interview && (
              <div>
                <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" />
                  Interview Details
                </h3>
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">
                          Date
                        </h4>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(application.Interview.interviewDate)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">
                          Time
                        </h4>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {application.Interview.interviewTime}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Interview Type
                      </h4>
                      <Badge className="flex items-center gap-1 font-normal w-fit">
                        {application.Interview.interviewType ===
                          InterviewType.VIDEO_CALL && (
                          <Video className="size-4" />
                        )}
                        {application.Interview.interviewType ===
                          InterviewType.VOICE_CALL && (
                          <Phone className="size-4" />
                        )}
                        {application.Interview.interviewType ===
                          InterviewType.FACE_TO_FACE && (
                          <Users className="size-4" />
                        )}
                        {application.Interview.interviewType.replace("-", " ")}
                      </Badge>
                    </div>
                    {application.Interview.note && (
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">
                          Notes
                        </h4>
                        <div className="text-sm bg-muted p-2 rounded-md">
                          {application.Interview.note}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Application Timeline */}
            <div>
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <History className="h-4 w-4" />
                Application History
              </h3>
              <div className="pl-2">
                <Timeline className="max-w-full">
                  <TimelineItem>
                    <TimelineHeader>
                      <TimelineTime>
                        {formatDate(application.createdAt)}
                      </TimelineTime>
                      <TimelineTitle className="text-sm font-medium text-secondary-foreground">
                        Application Submitted
                      </TimelineTitle>
                    </TimelineHeader>
                  </TimelineItem>
                  {application.ApplicationReview.map((review) => (
                    <TimelineItem key={review.id}>
                      <TimelineHeader>
                        <TimelineTime className="">
                          {formatDate(review.reviewedAt)}
                        </TimelineTime>
                        <TimelineTitle className="text-sm font-medium text-secondary-foreground">
                          {review.reviewedStatus}
                        </TimelineTitle>
                      </TimelineHeader>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </div>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};

// Helper function to determine status color
const getStatusColor = (status: ApplicationStatus) => {
  switch (status) {
    case "APPROVED":
      return "#10b981"; // green
    case "REJECTED":
      return "#ef4444"; // red
    case "PENDING":
      return "#f59e0b"; // amber
    case "INTERVIEW":
      return "#3b82f6"; // blue
    default:
      return "#6b7280"; // gray
  }
};

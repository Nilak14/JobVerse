"use client";

import { Dispatch, SetStateAction } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import { useQueryGetJobDescriptionById } from "@/hooks/query-hooks/getJobDescriptionWithId";
import { formatDistanceToNow } from "date-fns";
import {
  BadgeCheck,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JobDataDescription } from "@/lib/prisma-types/Job";
import { formatDate, renderSalaryText } from "@/lib/utils";
import ContentViewer from "../tiptap/ContentViewer";
import JobPreviewModalSkeleton from "../skeletons/JobPreviewModalSkeleton";
interface JobPreviewModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId: string;
}
const JobPreviewModal = ({ open, setOpen, jobId }: JobPreviewModalProps) => {
  const { data, isLoading } = useQueryGetJobDescriptionById(jobId);
  const job: JobDataDescription = data?.data || {};
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="md:min-w-[80vw] md:max-w-[80vw] max-w-full min-w-full ">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Job Preview</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            This is just a job preview this is not what job seeker will view
            your job as
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        {isLoading ? (
          <JobPreviewModalSkeleton />
        ) : (
          <>
            {job && (
              <div className="grid gap-6 py-4">
                {/* Header with company info */}
                <div className="flex items-start gap-4">
                  {job.company?.logoUrl && (
                    <div className="h-16 w-16 rounded-md overflow-hidden border">
                      <img
                        src={job.company.logoUrl || "/placeholder.svg"}
                        alt={`${job.company.name || "Company"} logo`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary">
                      {job.title || "Untitled Position"}
                    </h2>
                    {job.company?.name && (
                      <p className="text-muted-foreground">
                        {job.company.name}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.location && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                      )}
                      {job.workMode && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Briefcase className="h-3 w-3" />
                          {job.workMode}
                        </Badge>
                      )}
                      {job.jobType && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          {job.jobType}
                        </Badge>
                      )}
                      {job.isUrgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Key details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    {job.Salary && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Salary
                        </p>
                        <div className="font-medium">
                          <span>
                            {renderSalaryText({
                              displayType: job.Salary.type as
                                | "Maximum"
                                | "Starting"
                                | "Range"
                                | "Exact"
                                | null,
                              currency: job.Salary.currency,
                              exactAmount: job.Salary.amount,
                              maxAmount: job.Salary.maxAmount,
                              startingAmount: job.Salary.minAmount,
                            })}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {" "}
                            / {job.Salary.rate}
                          </span>
                        </div>
                      </div>
                    )}

                    {job.experienceLevel && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Experience
                        </p>
                        <p>{job.experienceLevel}</p>
                      </div>
                    )}

                    {job.deadline && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Application Deadline
                        </p>
                        <p className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(job.deadline)}
                        </p>
                      </div>
                    )}

                    {job.createdAt && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Posted
                        </p>
                        <p>
                          {formatDistanceToNow(new Date(job.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    )}

                    {job.totalHeads && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Vacancies
                        </p>
                        <p className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {job.totalHeads}
                        </p>
                      </div>
                    )}

                    {job.minEducationRequired && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Education
                        </p>
                        <p className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          {job.minEducationRequired}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Description */}
                {job.description && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentViewer content={job.description} />
                    </CardContent>
                  </Card>
                )}

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    {job.licenseRequired !== undefined && (
                      <div className="flex items-center gap-2">
                        <BadgeCheck
                          className={`h-5 w-5 ${job.licenseRequired ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span>
                          License{" "}
                          {job.licenseRequired ? "Required" : "Not Required"}
                        </span>
                      </div>
                    )}

                    {job.vehicleRequired !== undefined && (
                      <div className="flex items-center gap-2">
                        <BadgeCheck
                          className={`h-5 w-5 ${job.vehicleRequired ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span>
                          Vehicle{" "}
                          {job.vehicleRequired ? "Required" : "Not Required"}
                        </span>
                      </div>
                    )}

                    {job.resumeRequired !== undefined && (
                      <div className="flex items-center gap-2">
                        <BadgeCheck
                          className={`h-5 w-5 ${job.resumeRequired ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span>
                          Resume{" "}
                          {job.resumeRequired ? "Required" : "Not Required"}
                        </span>
                      </div>
                    )}

                    {job.preferredGender && (
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-primary" />
                        <span>Preferred Gender: {job.preferredGender}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Benefits */}
                {job.benefits && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{job.benefits}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </>
        )}
        <ResponsiveModalFooter></ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default JobPreviewModal;

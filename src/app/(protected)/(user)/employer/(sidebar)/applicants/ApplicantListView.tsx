"use client";
import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Download,
  Mail,
  Phone,
  Star,
  UserPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/Global/EmptyState";
import UserAvatar from "@/components/Global/Useravatar";
import ApplicationStatusBadge from "@/components/Global/ApplicationStatusBadge";
import { formatDate } from "@/lib/utils";

interface ApplicantListViewProps {
  applicantData: JobApplicationEmployer[];
}
const ApplicantListView = ({ applicantData }: ApplicantListViewProps) => {
  const hasApplicants = applicantData.length > 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  if (!hasApplicants) {
    return (
      <EmptyState
        icon={<UserPlus className="h-12 w-12 text-primary" />}
        title="No applicants yet"
        description="When candidates apply for your job postings, they'll appear here."
        action={<Button>Post a New Job</Button>}
      />
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {applicantData.map((applicant) => (
        <motion.div
          key={applicant.id}
          variants={item}
          whileHover={{ scale: 1.01 }}
          className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <div className="flex-shrink-0">
              <UserAvatar
                imageUrl={applicant.jobSeeker.user.image!}
                userName={applicant.jobSeeker.user.name!}
              />
            </div>
            <div className="grid flex-1 gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {" "}
                    {applicant.jobSeeker.user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    {applicant.job.title}
                  </p>
                </div>
                <ApplicationStatusBadge status={applicant.status} />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Applied {formatDate(applicant.createdAt)}
                </div>
                <div className="hidden flex-wrap gap-2 md:flex">
                  {applicant.jobSeeker.JobSeekerProfile?.skills
                    .slice(0, 3)
                    .map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  {applicant.jobSeeker.JobSeekerProfile?.skills && (
                    <>
                      {applicant.jobSeeker.JobSeekerProfile.skills.length >
                        3 && (
                        <Badge variant="outline">
                          +
                          {applicant.jobSeeker.JobSeekerProfile.skills.length -
                            3}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <div className="hidden gap-2 md:flex">
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
              >
                Schedule
              </Button>
              <Button size="sm">View Profile</Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
export default ApplicantListView;

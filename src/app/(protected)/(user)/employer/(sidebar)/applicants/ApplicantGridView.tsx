"use client";
import ApplicationStatusBadge from "@/components/Global/ApplicationStatusBadge";
import { EmptyState } from "@/components/Global/EmptyState";
import UserAvatar from "@/components/Global/Useravatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, MapPin, UserPlus } from "lucide-react";
import Link from "next/link";

import ApplicationEmployerDropdownAction from "@/components/applications/ApplicationEmployerDropdownAction";
interface ApplicantGridViewProps {
  applicantData: JobApplicationEmployer[];
}
const ApplicantGridView = ({ applicantData }: ApplicantGridViewProps) => {
  const hasApplicants = applicantData.length > 0;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  if (!hasApplicants)
    return (
      <EmptyState
        icon={<UserPlus className="h-12 w-12 text-primary" />}
        title="No applicants yet"
        description="When candidates apply for your job postings, they'll appear here."
        action={
          <Button asChild>
            <Link href="/employer/job">Post a New job</Link>
          </Button>
        }
      />
    );
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {applicantData.map((applicant) => (
        <motion.div key={applicant.id} variants={item}>
          <Card className="h-full ">
            <CardHeader className="pt-6 px-6 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex  items-center gap-4">
                  <UserAvatar
                    imageUrl={applicant.jobSeeker.user.image!}
                    userName={applicant.jobSeeker.user.name!}
                  />

                  <div>
                    <h3 className="font-semibold">
                      {applicant.jobSeeker.user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {applicant.job.title}
                    </p>
                  </div>
                </div>
                <ApplicationEmployerDropdownAction application={applicant} />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <ApplicationStatusBadge status={applicant.status} />
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {applicant.jobSeeker.JobSeekerProfile?.location}
              </div>
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Applied {formatDate(applicant.createdAt)}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
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
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
export default ApplicantGridView;

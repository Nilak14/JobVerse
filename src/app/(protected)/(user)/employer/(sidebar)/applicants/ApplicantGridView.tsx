"use client";
import ApplicationStatusBadge from "@/components/Global/ApplicationStatusBadge";
import { EmptyState } from "@/components/Global/EmptyState";
import UserAvatar from "@/components/Global/Useravatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Download, Mail, Phone, Star, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
interface ApplicantGridViewProps {
  applicantData: JobApplicationEmployer[];
}
const ApplicantGridView = ({ applicantData }: ApplicantGridViewProps) => {
  const hasApplicants = applicantData.length > 0;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    transition: {
      staggerChildren: 0.1,
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
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {applicantData.map((applicant) => (
        <motion.div
          key={applicant.id}
          variants={item}
          whileHover={{ y: -5 }}
          onHoverStart={() => setHoveredId(applicant.id)}
          onHoverEnd={() => setHoveredId(null)}
        >
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
                <ApplicationStatusBadge status={applicant.status} />
              </div>
            </CardHeader>
            <CardContent className="p-6">
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
            <CardFooter className="flex flex-col gap-2 border-t p-6">
              <div className="flex w-full gap-2">
                <Button className="flex-1" size="sm">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Schedule
                </Button>
              </div>
              <motion.div
                className="flex w-full justify-between"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hoveredId === applicant.id ? 1 : 0,
                  height: hoveredId === applicant.id ? "auto" : 0,
                }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
export default ApplicantGridView;

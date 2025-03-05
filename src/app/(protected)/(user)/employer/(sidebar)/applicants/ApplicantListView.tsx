"use client";
import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Download,
  FileText,
  Mail,
  Phone,
  Star,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/Global/EmptyState";
import UserAvatar from "@/components/Global/Useravatar";
import ApplicationStatusBadge from "@/components/Global/ApplicationStatusBadge";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApplicationEmployerDropdownAction from "@/components/applications/ApplicationEmployerDropdownAction";
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Applicant</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicantData.map((applicant, index) => (
              <motion.tr
                key={applicant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      imageUrl={applicant.jobSeeker.user.image!}
                      userName={applicant.jobSeeker.user.name!}
                    />
                    <div>
                      <div className="font-medium">
                        {applicant.jobSeeker.user.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span> {applicant.job.title}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
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
                            {applicant.jobSeeker.JobSeekerProfile.skills
                              .length - 3}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    {formatDate(applicant.createdAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <ApplicationStatusBadge status={applicant.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ApplicationEmployerDropdownAction application={applicant} />
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};
export default ApplicantListView;

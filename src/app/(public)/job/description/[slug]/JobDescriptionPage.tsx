import { JobDataDescription } from "@/lib/prisma-types/Job";
import Container from "@/components/Global/Container";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getTimeDifference,
  getTimeDistance,
  renderSalaryText,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ContentViewer from "@/components/tiptap/ContentViewer";
import { Separator } from "@/components/ui/separator";
import { Variants } from "framer-motion";
import JobDescriptionDetailButton from "@/components/Job/JobDescriptionDetailButton";
import BackButton from "@/components/Global/BackButton";
import { Session } from "next-auth";
interface JobDescriptionPageContentProps {
  job: JobDataDescription;
  containerVariants: Variants;
  itemVariant: Variants;
  session: Session | null;
}
const JobDescriptionPageContent = ({
  job,
  containerVariants,
  itemVariant,
  session,
}: JobDescriptionPageContentProps) => {
  const daysLeft = getTimeDifference(job.deadline!);
  return (
    <Container className="pt-10 mb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariant} className="mb-6">
          <BackButton />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header Part */}
            <motion.div variants={itemVariant}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="h-20 w-20 rounded-md border ">
                      <AvatarImage
                        src={job.company.logoUrl!}
                        alt={job.company.name}
                      />
                      <AvatarFallback className="text-xl font-bold">
                        {job.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold">{job.title}</h1>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1  ">
                          <BriefcaseBusiness size={16} />
                          {job.company.name}
                        </span>
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={16} />
                            {job.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          Posted {getTimeDistance(job.createdAt)} ago
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.isUrgent && (
                          <Badge
                            variant={"destructive"}
                            className="text-xs py-1"
                          >
                            Hiring Urgent
                          </Badge>
                        )}
                        <Badge className="text-xs py-1 bg-blue-400/10 text-blue-500 hover:bg-blue-400/10 ">
                          {job.jobType}
                        </Badge>
                        <Badge className="text-xs py-1 bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/10 ">
                          {job.workMode}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Job Details Page */}
            <motion.div variants={itemVariant}>
              <Card>
                <CardContent className="p-6">
                  <ContentViewer content={job.description} />
                </CardContent>
              </Card>
            </motion.div>
            {/* skills and requirements */}
            <motion.div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Skills & Requirements
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant={"outline"}
                            className="text-sm py-1.5 px-3"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <section className="space-y-6 grid grid-cols-1 md:grid-cols-2 items-start ">
                      {job.minEducationRequired && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            Education
                          </h3>
                          <p className="flex items-center gap-2">
                            <BookOpen
                              size={16}
                              className="text-muted-foreground"
                            />
                            {job.minEducationRequired}
                          </p>
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Experience
                        </h3>
                        <p className="flex items-center gap-2">
                          <Award size={16} className="text-muted-foreground" />
                          {job.experienceLevel === "0"
                            ? "Fresher"
                            : job.experienceLevel}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          License Required
                        </h3>
                        <p className="flex items-center gap-2">
                          <Award size={16} className="text-muted-foreground" />
                          {job.licenseRequired}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Vehicle Required
                        </h3>
                        <p className="flex items-center gap-2">
                          <Award size={16} className="text-muted-foreground" />
                          {job.vehicleRequired}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Preferred Gender
                        </h3>
                        <p className="flex items-center gap-2">
                          <Award size={16} className="text-muted-foreground" />
                          {job.preferredGender}
                        </p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          {/* side container */}
          <aside>
            <div className="space-y-6">
              {/* Apply Card */}
              <motion.div variants={itemVariant}>
                <Card className="overflow-hidden">
                  <CardContent className="p-6 space-y-6">
                    <h2 className="text-xl font-bold">Job Details</h2>
                    {job.Salary && (
                      <>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Salary
                            </span>
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
                          <Separator />
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Job Type
                            </span>
                            <span className="font-medium">{job.jobType}</span>
                          </div>

                          <Separator />

                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Work Mode
                            </span>
                            <span className="font-medium">{job.workMode}</span>
                          </div>

                          <Separator />

                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Positions
                            </span>
                            <span className="font-medium">
                              {job.totalHeads}
                            </span>
                          </div>

                          <Separator />

                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Deadline
                            </span>
                            <div className="flex items-center text-amber-600 font-medium">
                              <Calendar size={16} className="mr-1" />
                              {daysLeft ? (
                                <span>{daysLeft} remaining</span>
                              ) : (
                                <span>Expired</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {session && (
                          <JobDescriptionDetailButton
                            session={session}
                            job={job}
                          />
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              {/* Company Card */}
              <motion.div variants={itemVariant}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">About Company</h2>

                    <div className="flex flex-col items-center space-y-3">
                      <Avatar className="h-16 w-16 rounded-md border ">
                        <AvatarImage
                          src={job.company.logoUrl!}
                          alt={job.company.name}
                        />
                        <AvatarFallback className="text-xl font-bold">
                          {job.company.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-center">
                        {job.company.name}
                      </h3>
                      <Button variant="outline" className="w-full">
                        View Company Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariant}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Benefits</h2>

                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle
                            size={18}
                            className="text-green-500 mt-0.5 flex-shrink-0"
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </aside>
        </div>
      </motion.div>
    </Container>
  );
};
export default JobDescriptionPageContent;

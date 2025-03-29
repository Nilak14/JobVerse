import { JobSchemaType } from "@/schema/CreateJobSchema";
import { Card, CardContent } from "../ui/card";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { formatDate, getTimeDistance, renderSalaryText } from "@/lib/utils";
import { Badge } from "../ui/badge";
import ContentViewer from "../tiptap/ContentViewer";
import { Separator } from "../ui/separator";
import { useActiveCompany } from "@/store/useActiveCompany";
import UserAvatar from "../Global/Useravatar";
import Image from "next/image";

interface JobEmployerPreviewSectionProps {
  job: JobSchemaType;
}
const JobEmployerPreview = ({ job }: JobEmployerPreviewSectionProps) => {
  const { activeCompany } = useActiveCompany();
  return (
    <div className="w-full overflow-y-auto p-5">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 ">
                  <div className="flex items-center gap-4">
                    <Image
                      src={activeCompany.logoUrl!}
                      width={50}
                      height={50}
                      alt={activeCompany.name}
                      className="rounded-md object-cover"
                    />
                    {job.title && (
                      <h1 className="text-3xl font-bold">{job.title}</h1>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1  ">
                      <BriefcaseBusiness size={16} />
                      {activeCompany.name}
                    </span>
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      Posted {getTimeDistance(new Date())} ago
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.isUrgent && (
                      <Badge variant={"destructive"} className="text-xs py-1">
                        Hiring Urgent
                      </Badge>
                    )}
                    {job.jobType && (
                      <Badge className="text-xs py-1 bg-blue-400/10 text-blue-500 hover:bg-blue-400/10 ">
                        {job.jobType}
                      </Badge>
                    )}
                    {job.workMode && (
                      <Badge className="text-xs py-1 bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/10 ">
                        {job.workMode}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {job.description && (
          <div>
            <Card>
              <CardContent className="p-6">
                <ContentViewer content={job.description} />
              </CardContent>
            </Card>
          </div>
        )}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Skills & Requirements</h2>
              <div className="space-y-6">
                {job.skills && (
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
                )}

                <section className="space-y-6 grid grid-cols-1 md:grid-cols-2 items-start ">
                  {job.educationLevel && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Education
                      </h3>
                      <p className="flex items-center gap-2">
                        <BookOpen size={16} className="text-muted-foreground" />
                        {job.educationLevel}
                      </p>
                    </div>
                  )}
                  {job.experienceLevel && (
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
                  )}
                  {job.license && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        License Required
                      </h3>
                      <p className="flex items-center gap-2">
                        <Award size={16} className="text-muted-foreground" />
                        {job.license}
                      </p>
                    </div>
                  )}
                  {job.vehicle && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Vehicle Required
                      </h3>
                      <p className="flex items-center gap-2">
                        <Award size={16} className="text-muted-foreground" />
                        {job.vehicle}
                      </p>
                    </div>
                  )}
                  {job.preferredGender && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Preferred Gender
                      </h3>
                      <p className="flex items-center gap-2">
                        <Award size={16} className="text-muted-foreground" />
                        {job.preferredGender}
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
        <aside>
          <div className="space-y-6">
            {/* Apply Card */}
            <div>
              <Card className="overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-xl font-bold">Job Details</h2>

                  <div className="space-y-4">
                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Salary</span>
                      <p>
                        <span>
                          {renderSalaryText({
                            maxAmount: Number(job?.maxSalaryAmount),
                            startingAmount: Number(job?.minSalaryAmount),
                            exactAmount: Number(job?.amount),
                            //@ts-ignore
                            displayType: job?.salaryType,
                            currency: job?.salaryCurrency,
                          })}{" "}
                        </span>
                        <span className="lowercase">
                          / per {job?.salaryRate}
                        </span>
                      </p>
                    </div>
                    <Separator />

                    {job.jobType && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Job Type</span>
                        <span className="font-medium">{job.jobType}</span>
                      </div>
                    )}

                    <Separator />

                    {job.workMode && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Work Mode</span>
                        <span className="font-medium">{job.workMode}</span>
                      </div>
                    )}

                    <Separator />

                    {job.totalHeads && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Positions</span>
                        <span className="font-medium">{job.totalHeads}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Deadline</span>
                      <div className="flex items-center text-amber-600 font-medium">
                        <Calendar size={16} className="mr-1" />
                        {job.applicationDeadline ? (
                          <>{formatDate(job.applicationDeadline)}</>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Benefits</h2>

                  {job.benefits && (
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
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default JobEmployerPreview;

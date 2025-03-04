import { JobApplication } from "@/lib/prisma-types/Application";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "../Global/Useravatar";
import { formatDate, renderSalaryText } from "@/lib/utils";
import ApplicationStatusBadge from "../Global/ApplicationStatusBadge";
import ApplicationTableAction from "../applications/ApplicationTableAction";

interface ApplicationTableCardProps {
  data: JobApplication;
}

const ApplicationTableCard = ({ data }: ApplicationTableCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Left section: Avatar and job details */}
        <div className="flex items-center gap-4">
          <UserAvatar
            imageUrl={data.job.company.logoUrl!}
            userName={data.job.company.name}
          />
          <div>
            <CardTitle>{data.job.title}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {data.job.company.name}
            </p>
          </div>
        </div>
        {/* Right section: Status, date and actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <div className="flex flex-col items-start">
            <ApplicationStatusBadge status={data.status} />
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(data.createdAt)}
            </p>
          </div>
          <div>
            <ApplicationTableAction application={data} />
          </div>
        </div>
        <CardDescription className="sr-only">Job Application</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ApplicationTableCard;

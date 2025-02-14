import { JobDataBrowse } from "@/lib/prisma-types/Job";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Banknote,
  Bookmark,
  MapPinCheckInside,
  UsersRound,
} from "lucide-react";
import { cn, formatNumber, getTimeDistance } from "@/lib/utils";

interface JobCardProps {
  job: JobDataBrowse;
}
const JobCard = ({ job }: JobCardProps) => {
  const endTime = getTimeDistance(job.deadline!);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between flex-row mb-3">
          <div className="flex gap-4 items-center  ">
            <Image
              src={job.company.logoUrl!}
              alt={job.company.name}
              width={50}
              height={50}
              className="aspect-square rounded-full"
            />
            <div className=" content-start flex justify-between flex-col gap-1 truncate line-clamp-1">
              <p className="text-xs text-muted-foreground">
                {job.company.name}
              </p>
              <CardTitle className="">{job.title}</CardTitle>
            </div>
          </div>
          <div>
            <button className="flex items-center gap-2">
              <Bookmark
                className={cn(
                  "size-5 hover:text-primary fill-primary text-primary"
                )}
              />
            </button>
          </div>
        </div>
        <div className="">
          <Separator />
        </div>
        <CardDescription className="sr-only">Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-5 items-center">
            <JobBrowseBadge text={job.workMode} />
            <JobBrowseBadge text={job.jobType} />
            {/* <JobBrowseBadge text={endTime + " left"} /> */}
          </div>
          <div className="space-y-3">
            <SalaryDisplay
              rate={job.Salary?.rate!}
              exactAmount={job.Salary?.amount}
              maxAmount={job.Salary?.maxAmount}
              startingAmount={job.Salary?.minAmount}
              displayType={
                job.Salary?.type as
                  | "Maximum"
                  | "Starting"
                  | "Range"
                  | "Exact"
                  | null
              }
              currency={job.Salary?.currency}
            />
            <p className="flex items-center gap-2 text-sm">
              <MapPinCheckInside className="text-red-600 size-5" />
              <span>{job.location}</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <UsersRound className="text-blue-600 size-5" />
              <span>{formatNumber(200)} applicants</span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="flex justify-between items-center w-full">
          <Button variant={"default"}>Apply Now</Button>
          {/* <Button>Preview</Button> */}
          <p className="text-muted-foreground text-sm">
            Posted {getTimeDistance(job.createdAt)} ago
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
export default JobCard;

export const JobBrowseBadge = ({ text }: { text: string | null }) => {
  return (
    <p className="text-primary bg-primary/10 px-5 py-2 text-xs font-bold rounded-xl w-fit whitespace-nowrap">
      {text}
    </p>
  );
};

export const SalaryDisplay = ({
  maxAmount,
  startingAmount,
  exactAmount,
  displayType,
  currency = "Rs.",
  rate,
}: {
  maxAmount?: number | null;
  startingAmount?: number | null;
  exactAmount?: number | null;
  displayType: "Maximum" | "Starting" | "Range" | "Exact" | null;
  currency?: string | null;
  rate: string;
}) => {
  const renderSalaryText = () => {
    switch (displayType) {
      case "Maximum":
        return `upto ${currency} ${formatNumber(exactAmount || 0)}`;
      case "Starting":
        return `from ${currency} ${formatNumber(exactAmount || 0)}`;
      case "Range":
        if (startingAmount && maxAmount) {
          return `${currency} ${formatNumber(startingAmount)} - ${currency} ${formatNumber(maxAmount)}`;
        }
        return "";
      case "Exact":
        return `${currency} ${formatNumber(exactAmount || 0)}`;
      default:
        return "";
    }
  };
  return (
    <p className="flex items-center gap-2 text-sm">
      <Banknote className="text-green-600 size-5" />
      <span>
        {renderSalaryText()} <span className="lowercase">/ per {rate}</span>
      </span>
    </p>
  );
};

"use client";
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
  MapPinCheckInside,
  UsersRound,
  Timer,
  Calendar,
  Eye,
} from "lucide-react";
import {
  cn,
  formatNumber,
  getTimeDifference,
  renderSalaryText,
} from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import LinkButtonAnimated from "../ui/animated-button-link";

import SaveJobButton from "../Global/SaveJobButton";
import { Session } from "next-auth";
import ApplyNowButton from "../Global/ApplyNowButton";

interface JobCardProps {
  job: JobDataBrowse;
  session: Session;
  loading?: boolean;
}

const JobCard = ({ job, session, loading }: JobCardProps) => {
  const daysLeft = getTimeDifference(job.deadline!);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("relative ", loading && "animate-pulse")}
    >
      {job.isUrgent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            delay: 0.3,
          }}
          className="absolute -top-2 -right-2 z-10"
        >
          <div className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full shadow-md">
            <Timer className="size-3 animate-pulse" />
            <span className="text-xs font-semibold">Urgent</span>
          </div>
        </motion.div>
      )}
      <Card className={cn(job.isUrgent && "border-red-500")}>
        <CardHeader>
          <div className="flex justify-between flex-row mb-3">
            <div className="flex gap-4 items-center">
              <Link href={`/company/${job.company.id}`}>
                <Image
                  src={job.company.logoUrl!}
                  alt={job.company.name}
                  width={50}
                  height={50}
                  className="aspect-square rounded-full"
                />
              </Link>

              <div className="content-start flex justify-between flex-col gap-1 truncate line-clamp-1">
                <LinkButtonAnimated lineClassName="bg-muted-foreground">
                  <Link
                    className="text-xs text-muted-foreground"
                    href={`/company/${job.company.id}`}
                  >
                    {job.company.name}
                  </Link>
                </LinkButtonAnimated>

                <CardTitle className="">{job.title}</CardTitle>
              </div>
            </div>
            <div>
              <SaveJobButton
                jobId={job.id}
                initialState={{
                  isSavedByUser: job.saved.some(
                    (s) => s.userId === session.jobSeekerId
                  ),
                }}
                className="hover:bg-transparent"
              />
            </div>
          </div>
          <div className="">
            <Separator />
          </div>
          <CardDescription className="sr-only">
            Card Description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-5 items-center">
              <JobBrowseBadge text={job.workMode} />
              <JobBrowseBadge text={job.jobType} />
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
                <span>{job.location ? job.location : job.workMode}</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <UsersRound className="text-blue-600 size-5" />
                <span>{formatNumber(200)} applicants</span>
              </p>
              {job.deadline && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn("flex items-center gap-2 text-sm")}
                >
                  <Calendar className={cn("size-5")} />
                  {daysLeft ? (
                    <span>{daysLeft} remaining</span>
                  ) : (
                    <span>Expired</span>
                  )}
                </motion.p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <div className="flex justify-between items-center w-full">
            <ApplyNowButton jobData={job} size={"sm"} />

            <Button asChild size={"sm"} variant={"secondary"}>
              <Link href={`/job/description/${job.id}`}>
                <span>
                  <Eye size={10} />
                </span>
                View More
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
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
  return (
    <p className="flex items-center gap-2 text-sm">
      <Banknote className="text-green-600 size-5" />
      <span>
        {renderSalaryText({
          maxAmount,
          startingAmount,
          exactAmount,
          displayType,
          currency,
        })}{" "}
        <span className="lowercase">/ per {rate}</span>
      </span>
    </p>
  );
};

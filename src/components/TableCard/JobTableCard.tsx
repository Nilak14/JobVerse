"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobServerData } from "@/lib/prisma-types/Job";
import JobTableRowAction from "../Job/JobTableRowAction";
import {
  Briefcase,
  Calendar,
  Eye,
  Users,
  EllipsisVertical,
} from "lucide-react";
import {
  DateTableCell,
  JobStatusBadge,
  UserTableCell,
} from "../Global/TableRowComponents";

interface JobTableCardProps {
  jobData: JobServerData;
}

const JobTableCard = ({ jobData }: JobTableCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex justify-between items-start flex-row pb-2">
        <div className="space-y-1.5 flex-1">
          <div className="flex  gap-3 w-full  ">
            <CardTitle className="text-xl flex-1 line-clamp-1 font-semibold">
              {jobData.title}
            </CardTitle>
            <div className="flex-1 ">
              <JobStatusBadge status={jobData.status} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="size-4" />
            <span className="text-sm">{jobData.workMode}</span>
          </div>
        </div>
        <JobTableRowAction
          TriggerIcon={EllipsisVertical}
          id={jobData.id}
          status={jobData.status}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserTableCell
              email={jobData.creator.user.email}
              imageUrl={jobData.creator.user.image || ""}
              username={jobData.creator.user.name || ""}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="size-4" />
              <span className="text-sm font-medium">5 views</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4" />
              <span className="text-sm font-medium">0 applicants</span>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-6 justify-between  w-full">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="text-muted-foreground">Posted on </span>
                <DateTableCell suffix="ago" date={jobData.createdAt} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="text-muted-foreground">Expires On </span>
                {jobData.deadline ? (
                  <DateTableCell prefix="in" date={jobData.deadline} />
                ) : (
                  <p className="font-medium">N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobTableCard;

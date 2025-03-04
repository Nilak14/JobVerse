"use client";

import { JobApplication } from "@/lib/prisma-types/Application";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useSearchParams } from "next/navigation";
import { ApplicationStatus } from "@prisma/client";
import JobApplicationTable from "../Table/JobApplicationTable";
import { jobApplicationColumn } from "@/columns/job-application-column";
interface ApplicationDataTabProps {
  pendingJobCount: number;
  rejectedJobCount: number;
  acceptedJobCount: number;
  interviewJobCount: number;
  totalJobCount: number;
  application: JobApplication[] | null;
}
const ApplicationDataTab = ({
  acceptedJobCount,
  application,
  interviewJobCount,
  pendingJobCount,
  rejectedJobCount,
  totalJobCount,
}: ApplicationDataTabProps) => {
  const searchParams = useSearchParams();
  return (
    <Tabs
      onValueChange={(e) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("tab", e);
        window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
      }}
      value={searchParams.get("tab") || "ALL"}
      className="space-y-6 mt-8"
      defaultValue="all"
    >
      <div className="space-y-6 relative">
        <ScrollArea>
          <div className="w-full relative h-12">
            <TabsList className="flex absolute h-12">
              <TabsTrigger className="py-2" value="ALL">
                All ({totalJobCount})
              </TabsTrigger>
              <TabsTrigger className="py-2" value={ApplicationStatus.PENDING}>
                Pending ({pendingJobCount})
              </TabsTrigger>
              <TabsTrigger className="py-2" value={ApplicationStatus.INTERVIEW}>
                Interviews ({interviewJobCount})
              </TabsTrigger>
              <TabsTrigger className="py-2" value={ApplicationStatus.APPROVED}>
                Offered ({acceptedJobCount})
              </TabsTrigger>
              <TabsTrigger className="py-2" value={ApplicationStatus.REJECTED}>
                Rejected ({rejectedJobCount})
              </TabsTrigger>
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {["ALL", "PENDING", "INTERVIEW", "APPROVED", "REJECTED"].map((val) => {
          return (
            <TabsContent key={val} value={val}>
              {val === "ALL" ? (
                <JobApplicationTable
                  key={val}
                  columns={jobApplicationColumn}
                  data={application!}
                />
              ) : (
                <div>
                  <JobApplicationTable
                    key={val}
                    columns={jobApplicationColumn}
                    data={
                      application?.filter((app) => app.status === val) || []
                    }
                  />
                </div>
              )}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};
export default ApplicationDataTab;

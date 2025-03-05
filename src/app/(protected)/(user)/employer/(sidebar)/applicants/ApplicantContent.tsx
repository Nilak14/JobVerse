"use client";

import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplicantGridView from "./ApplicantGridView";
import ApplicantListView from "./ApplicantListView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Grid3X3, List } from "lucide-react";
interface ApplicantContentProps {
  applicantData: JobApplicationEmployer[];
}
const ApplicantContent = ({ applicantData }: ApplicantContentProps) => {
  const [data, setData] = useState<JobApplicationEmployer[]>(
    applicantData || []
  );
  const allJobs = applicantData.map((application) => application.job);

  return (
    <Tabs defaultValue="grid" className="mt-6">
      <div className="flex justify-between flex-col md:flex-row gap-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">
              {" "}
              <Grid3X3 className="h-4 w-4 mr-2" /> Grid View
            </TabsTrigger>
            <TabsTrigger value="list">
              {" "}
              <List className="h-4 w-4 mr-2" /> List View
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <div>
            <Select
              defaultValue="0"
              onValueChange={(value) => {
                if (value === "0") {
                  setData(applicantData);
                } else {
                  const filteredData = applicantData.filter(
                    (application) => application.job.id === value
                  );
                  setData(filteredData);
                }
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Show Candidate For" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>Show All Candidate</SelectItem>
                {allJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              defaultValue="all"
              onValueChange={(value) => {
                if (value === "all") {
                  setData(applicantData);
                } else {
                  const filteredData = applicantData.filter(
                    (application) => application.status === value
                  );
                  setData(filteredData);
                }
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="INTERVIEW">Interviewing</SelectItem>
                <SelectItem value="APPROVED">Offered</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <TabsContent value="grid" className="mt-6">
        <ApplicantGridView applicantData={data} />
      </TabsContent>
      <TabsContent value="list" className="mt-6">
        <ApplicantListView applicantData={data} />
      </TabsContent>
    </Tabs>
  );
};
export default ApplicantContent;

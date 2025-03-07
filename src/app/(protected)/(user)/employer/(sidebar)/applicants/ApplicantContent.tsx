"use client";

import { useState, useMemo } from "react";
import { JobApplicationEmployer } from "@/lib/prisma-types/Application";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Ensure you have an Input component available
import ApplicantGridView from "./ApplicantGridView";
import ApplicantListView from "./ApplicantListView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, List } from "lucide-react";

interface ApplicantContentProps {
  applicantData: JobApplicationEmployer[];
}

const ApplicantContent = ({ applicantData }: ApplicantContentProps) => {
  // Extract jobs for filtering options
  const allJobs = applicantData.map((application) => application.job);

  // States for filtering, searching, and sorting
  const [selectedJob, setSelectedJob] = useState("0"); // "0" means show all jobs
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" for newest first, "asc" for oldest first

  // Apply filtering and searching
  const filteredData = useMemo(() => {
    return applicantData.filter((application) => {
      const jobMatch =
        selectedJob === "0" || application.job.id === selectedJob;
      const statusMatch =
        selectedStatus === "all" || application.status === selectedStatus;
      return jobMatch && statusMatch;
    });
  }, [applicantData, selectedJob, selectedStatus]);

  // Apply sorting based on creation date
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    return data;
  }, [filteredData, sortOrder]);

  return (
    <Tabs defaultValue="list" className="mt-6">
      <div className="flex justify-between flex-col md:flex-row gap-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">
              <Grid3X3 className="h-4 w-4 mr-2" /> Grid View
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" /> List View
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Filter by Job */}
          <div>
            <Select onValueChange={setSelectedJob}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Show Candidate For" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Show All Candidate</SelectItem>
                {allJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Filter by Status */}
          <div>
            <Select onValueChange={setSelectedStatus}>
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

          {/* Sorting by Created Date */}
          <div>
            <Select onValueChange={setSortOrder}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sort by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Oldest First</SelectItem>
                <SelectItem value="desc">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <TabsContent value="grid" className="mt-6">
        <ApplicantGridView applicantData={sortedData} />
      </TabsContent>
      <TabsContent value="list" className="mt-6">
        <ApplicantListView applicantData={sortedData} />
      </TabsContent>
    </Tabs>
  );
};

export default ApplicantContent;

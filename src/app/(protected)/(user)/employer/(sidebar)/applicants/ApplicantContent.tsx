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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Grid3X3, List } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ApplicantGridView from "./ApplicantGridView";
import ApplicantListView from "./ApplicantListView";

interface ApplicantContentProps {
  applicantData: JobApplicationEmployer[];
}

const ApplicantContent = ({ applicantData }: ApplicantContentProps) => {
  const searchParams = useSearchParams();

  // Extract jobs for filtering options
  const allJobs = applicantData.map((application) => application.job);

  // States for filtering, searching, and sorting
  const [selectedJob, setSelectedJob] = useState(
    searchParams.get("jobId") || "0"
  ); // "0" means show all jobs
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sorting-related states:
  // sortType: decides whether we sort by date or rating
  const [sortType, setSortType] = useState<"date" | "rating">("date");
  const [sortOrder, setSortOrder] = useState("desc"); // for date sorting: "desc" for newest first, "asc" for oldest first
  const [ratingSortOrder, setRatingSortOrder] = useState("desc"); // for rating sorting: "desc" for higher to lower, "asc" for lower to higher

  // Determine if we have at least one valid rating to enable rating sorting.
  const hasValidRating = useMemo(() => {
    return applicantData.some(
      (application) => !isNaN(Number(application.rating))
    );
  }, [applicantData]);

  // Apply filtering based on job and status
  const filteredData = useMemo(() => {
    return applicantData.filter((application) => {
      const jobMatch =
        selectedJob === "0" || application.job.id === selectedJob;
      const statusMatch =
        selectedStatus === "all" || application.status === selectedStatus;
      return jobMatch && statusMatch;
    });
  }, [applicantData, selectedJob, selectedStatus]);

  // Apply sorting based on sortType and the chosen order
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    if (sortType === "rating" && hasValidRating) {
      data.sort((a, b) => {
        const ratingA = Number(a.rating);
        const ratingB = Number(b.rating);
        // Fallback to 0 if conversion fails
        const validA = isNaN(ratingA) ? 0 : ratingA;
        const validB = isNaN(ratingB) ? 0 : ratingB;
        return ratingSortOrder === "asc" ? validA - validB : validB - validA;
      });
    } else {
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    }
    return data;
  }, [filteredData, sortType, sortOrder, ratingSortOrder, hasValidRating]);

  return (
    <Tabs defaultValue="list" className="mt-6">
      <div className="flex justify-between flex-col gap-6">
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
            <Select
              defaultValue={searchParams.get("jobId") || "0"}
              onValueChange={(e) => {
                setSelectedJob(e);
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set("jobId", e);
                window.history.replaceState(
                  null,
                  "",
                  `?${newSearchParams.toString()}`
                );
              }}
            >
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

          {/* Sorting type: Date vs Rating */}
          <div>
            <Select
              onValueChange={(val) => setSortType(val as "date" | "rating")}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                {/* Render rating option only if there is at least one valid rating */}
                {hasValidRating && (
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Sorting order for date or rating */}
          {sortType === "date" ? (
            <div>
              <Select onValueChange={setSortOrder} defaultValue="desc">
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Sort by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Oldest First</SelectItem>
                  <SelectItem value="desc">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            // For rating sorting, only show if we have valid ratings.
            hasValidRating && (
              <div>
                <Select onValueChange={setRatingSortOrder} defaultValue="desc">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Sort by Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Lower to Higher</SelectItem>
                    <SelectItem value="desc">Higher to Lower</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )
          )}
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

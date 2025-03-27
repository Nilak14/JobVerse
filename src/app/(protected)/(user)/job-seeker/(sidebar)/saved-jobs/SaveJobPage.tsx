"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JobCard from "@/components/Job/JobCard";
import EmptySavedJobsState from "@/components/Job/NoSavedJobs";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import { getUserSavedJob } from "@/hooks/query-hooks/getUserSavedJobs";
import { createArray } from "@/lib/utils";
import { Session } from "next-auth";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SaveJobPageProps {
  session: Session;
}

const SaveJobPage = ({ session }: SaveJobPageProps) => {
  const { data, isLoading, isRefetching } = getUserSavedJob();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(data || []);

  useEffect(() => {
    if (data) {
      setFilteredJobs(
        data.filter((job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [data, searchTerm]);

  // Simple, professional animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-background border-b border-border/10">
          <h1 className="text-2xl font-bold text-foreground">Saved Jobs</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4 sm:px-6 lg:px-8">
          {createArray(10).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Simple Header */}
      <div className="w-full bg-background border-b border-border/10">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader>
            <h1 className="text-2xl font-bold text-foreground">
              Saved Jobs ({filteredJobs.length})
            </h1>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search saved jobs by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {!data || data.length <= 0 ? (
        <EmptySavedJobsState />
      ) : filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            No matches found
          </h3>
          <p className="mt-2 text-muted-foreground max-w-md">
            We couldn't find any saved jobs matching "{searchTerm}"
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSearchTerm("")}
          >
            Clear search
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredJobs.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <JobCard loading={isRefetching} job={job} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SaveJobPage;

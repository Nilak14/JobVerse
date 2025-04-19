'use client'
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function JobSeekerProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section Skeleton */}
        <Card className="border-none shadow-lg mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
              <div className="space-y-3 text-center md:text-left flex-1 w-full">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <Skeleton className="h-9 w-48 mb-2" />
                    <Skeleton className="h-6 w-24 self-center md:self-auto" />
                  </div>
                  <Skeleton className="h-7 w-40 mb-2" />
                </div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Bio Skeleton */}
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            {/* Skills Skeleton */}
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-20" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications Skeleton */}
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-primary pl-4 py-1"
                  >
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-5 w-48 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Work Experience Skeleton */}
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-primary"
                  >
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <Skeleton className="h-6 w-48 mb-2 md:mb-0" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education Skeleton */}
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-primary"
                  >
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <Skeleton className="h-6 w-64 mb-2 md:mb-0" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-56" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

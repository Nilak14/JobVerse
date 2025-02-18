"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkX, Search, ArrowRight, Sparkles } from "lucide-react";

const EmptySavedJobsState = () => {
  return (
    <section className="flex h-full w-full items-center justify-center py-12 px-4 bg-background">
      <Card className="max-w-md w-full border border-border">
        <CardHeader className="items-center text-center space-y-2">
          {/* Icon Container */}
          <div className="relative mb-2">
            <div className="bg-secondary/30 p-6 rounded-full">
              <BookmarkX size={48} className="text-primary " />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles size={24} className="text-primary " />
            </div>
          </div>

          <CardTitle className="text-2xl font-semibold tracking-wide text-foreground">
            Your saved jobs list is empty
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-sm">
            Save jobs that interest you to keep track of opportunities and apply
            later when you're ready.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Primary Action */}
          <Button asChild className="w-full ">
            <Link
              href="/job-seeker/browse/jobs"
              className="flex items-center justify-center gap-2"
            >
              <Search size={18} />
              <span>Explore Jobs</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge
              variant="outline"
              className="border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 cursor-pointer transition-colors"
            >
              Popular roles
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 cursor-pointer transition-colors"
            >
              Recommended
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 cursor-pointer transition-colors"
            >
              Recently added
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex-col">
          <p className="text-xs text-muted-foreground italic mt-2">
            Tip: You'll receive notifications when new roles matching your
            profile are posted.
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default EmptySavedJobsState;

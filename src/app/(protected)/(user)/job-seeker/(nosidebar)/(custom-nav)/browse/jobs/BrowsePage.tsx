"use client";

import {
  Filters,
  useBrowseJobInfiniteQuery,
} from "@/hooks/query-hooks/useBrowseJobInfiniteQuery";
import BrowsePageFilter from "./BrowseJobFilter";
import BrowsePageContent from "./BrowsePageContent";
import { useSearchParams } from "next/navigation";
import BrowsePageSearch from "./BrowsePageSearch";
import { Session } from "next-auth";
import BrowsePageFilterSheet from "./BrowsePageFilterSheet";
import BackButton from "@/components/Global/BackButton";
import NearByJobs from "./NearByJobs";
import { Briefcase } from "lucide-react";

interface BrowsePageProps {
  session?: Session | null;
  showBackButton?: boolean;
  showNearByJobs: boolean;
}

const BrowsePage = ({
  session,
  showBackButton = true,
  showNearByJobs,
}: BrowsePageProps) => {
  const searchParams = useSearchParams();
  const filters: Filters = {
    workMode: searchParams.get("workMode") || "",
    jobTypes: searchParams.get("jobTypes") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
    globalSearch: searchParams.get("globalSearch") || "",
    companySearch: searchParams.get("companySearch") || "",
    locationSearch: searchParams.get("locationSearch") || "",
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useBrowseJobInfiniteQuery(filters);

  const jobs =
    data?.pages
      .flatMap((page) => page.data?.data.jobs)
      .filter((job) => job !== undefined) ?? [];

  return (
    <>
      <div className="flex">
        <aside className="max-w-[300px] w-[300px] bg-sidebar fixed h-[calc(100vh-64px)] overflow-y-auto hidden md:block">
          <div className="flex items-center px-5">
            {showBackButton && <BackButton />}
          </div>
          <BrowsePageFilter />
        </aside>
        <section className="flex-1 md:pl-[340px] px-10 mx-auto mt-10 ">
          {session && showNearByJobs && (
            <div>
              <NearByJobs />
              <div className="flex items-center my-5">
                <div className="bg-primary/20 p-2 rounded-lg mr-3">
                  <Briefcase className="text-primary" size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl">All Jobs</p>
                  <p className="text-sm text-muted-foreground">
                    Discover job opportunities that match your skills and
                    interests
                  </p>
                </div>
              </div>
            </div>
          )}
          <BrowsePageSearch />
          <div className="md:hidden mb-5">
            <BrowsePageFilterSheet>
              <BrowsePageFilter />
            </BrowsePageFilterSheet>
          </div>
          <BrowsePageContent
            session={session}
            status={status}
            fetchNextPage={fetchNextPage}
            hasNextPage={!!hasNextPage}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
            jobs={jobs}
          />
        </section>
      </div>
    </>
  );
};

export default BrowsePage;

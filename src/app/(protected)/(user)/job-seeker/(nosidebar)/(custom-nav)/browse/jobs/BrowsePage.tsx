"use client";

import {
  Filters,
  useBrowseJobInfiniteQuery,
} from "@/hooks/query-hooks/useBrowseJobInfiniteQuery";
import BrowsePageTop from "./BrowsePageTop";
import BrowsePageFilter from "./BrowseJobFilter";
import BrowsePageContent from "./BrowsePageContent";
import { useSearchParams } from "next/navigation";
import BrowsePageSearch from "./BrowsePageSearch";
import { Session } from "next-auth";
import BrowsePageFilterSheet from "./BrowsePageFilterSheet";
import BackButton from "@/components/Global/BackButton";

interface BrowsePageProps {
  session: Session;
}

const BrowsePage = ({ session }: BrowsePageProps) => {
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
    <div>
      <header className="sticky top-0 z-20  overflow-hidden">
        <BrowsePageTop user={session.user} />
      </header>
      <div className="flex">
        <aside className="max-w-[300px] w-[300px] bg-sidebar fixed h-[calc(100vh-64px)] overflow-y-auto hidden md:block">
          <div className="flex items-center px-5">
            <BackButton />
          </div>
          <BrowsePageFilter />
        </aside>
        <section className="flex-1 md:pl-[340px] px-10 mx-auto mt-10 ">
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
    </div>
  );
};

export default BrowsePage;

"use client";

import { useBrowseJobInfiniteQuery } from "@/hooks/query-hooks/useBrowseJobInfiniteQuery";
import BrowsePageTop from "./BrowsePageTop";
import BrowsePageFilter from "./BrowseJobFilter";
import { ExtendedUser } from "@/next-auth";
import BrowsePageContent from "./BrowsePageContent";
import { Input } from "@/components/ui/input";
import { MapPinCheckInside, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HEADER_HEIGHT = "4rem";

interface BrowsePageProps {
  user: ExtendedUser;
}

const BrowsePage = ({ user }: BrowsePageProps) => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useBrowseJobInfiniteQuery();

  const jobs =
    data?.pages
      .flatMap((page) => page.data?.data.jobs)
      .filter((job) => job !== undefined) ?? [];

  return (
    <div>
      <header className="sticky top-0 z-20  overflow-hidden">
        <BrowsePageTop user={user} />
        {/* <div className="w-full bg-background flex py-5">
          <div className="md:pl-20 px-10 w-full">
            <div className="flex md:gap-20 flex-col md:flex-row gap-5">
              <div>
                <Input
                  placeholder="Find Jobs"
                  startIcon={Search}
                  className="w-full md:w-[300px] "
                />
              </div>
              <div>
                <Input
                  placeholder="Find Jobs By Location"
                  startIcon={MapPinCheckInside}
                  className="md:w-[300px] w-full"
                />
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <p>Popular Search</p>
              <div className="space-x-4">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/10 cursor-pointer">
                  Frontend Developer
                </Badge>
              </div>
            </div>
          </div>
        </div> */}
      </header>
      <div className="flex ">
        <aside className="max-w-[300px] w-[300px] bg-sidebar fixed h-[calc(100vh-64px)] overflow-y-auto hidden md:block">
          <BrowsePageFilter />
        </aside>

        <section className="flex-1 md:pl-[340px] px-10 mx-auto mt-10 ">
          <BrowsePageContent
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

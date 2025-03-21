import Container from "@/components/Global/Container";
import JobCard from "@/components/Job/JobCard";
import NavBar from "@/components/LandingPage/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { searchJobByLocation } from "@/data-access/job/searchJob";
import { locations } from "@/lib/data/SEOData";
import { BriefcaseIcon, MapPinIcon, SearchIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ location: string }>;
}

export const revalidate = 86400; // revalidate after 24 hours

export async function generateStaticParams() {
  return locations.map((location) => ({ location })).flat();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { location } = await params;
  const locationDecoded = decodeURIComponent(location);
  const results = await searchJobByLocation(locationDecoded);
  const currentYear = new Date().getFullYear();

  return {
    title: `Top ${results?.length || 0} jobs in ${locationDecoded} - Updated ${currentYear}`,
    description: `Find the best jobs in ${locationDecoded}. We have a total of ${results?.length || 0} jobs available for you. Updated ${currentYear}`,
    keywords: `${locationDecoded}, jobs, job search, Jobs ${locationDecoded}, jobs in ${locationDecoded}, top jobs in ${locationDecoded}`,
  };
}

const JobLocationPage = async ({ params }: PageProps) => {
  const { location } = await params;
  const locationDecoded = decodeURIComponent(location);
  const results = await searchJobByLocation(locationDecoded);
  const hasResults = results && results.length > 0;
  const currentYear = new Date().getFullYear();
  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-b from-primary/10 to-background py-8">
        <Container>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <MapPinIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-4xl font-bold text-center">
              Jobs in {locationDecoded}
            </h1>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Discover the best career opportunities in {locationDecoded}. Browse
            our curated list of positions updated for {currentYear}.
          </p>
        </Container>
      </div>

      <main className="py-12">
        <Container>
          {hasResults ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">
                    {results.length} {results.length === 1 ? "Job" : "Jobs"}{" "}
                    Available
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {results.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </>
          ) : (
            <Card className="p-8 text-center max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <SearchIcon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">
                  No jobs found in {locationDecoded}
                </h2>
                <p className="text-muted-foreground">
                  We couldn't find any job listings for this location at the
                  moment. Please try another location or check back later.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button asChild>
                    <Link href="/job">Browse All Jobs</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Return Home</Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-background   rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              About Jobs in {locationDecoded}
            </h2>
            <div className="prose max-w-none text-muted-foreground">
              <p>
                Looking for jobs in {locationDecoded}? Our comprehensive job
                board features opportunities from leading employers in the area.
                Whether you're seeking entry-level positions or executive roles,
                our curated list of {results?.length || 0} jobs in{" "}
                {locationDecoded} provides valuable insights into the local job
                market.
              </p>
              <p className="mt-4">
                The job market in {locationDecoded} offers diverse opportunities
                across multiple industries. Our regularly updated listings
                ensure you have access to the latest openings. Bookmark this
                page to stay informed about new job opportunities in{" "}
                {locationDecoded}.
              </p>
            </div>
          </div>
        </Container>
      </main>

      <section className="bg-primary/5 py-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore more opportunities or set up job alerts to be notified
              when new positions become available in {locationDecoded}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link href="/job">View All Jobs</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default JobLocationPage;

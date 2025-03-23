import Container from "@/components/Global/Container";
import JobCard from "@/components/Job/JobCard";
import NavBar from "@/components/LandingPage/NavBar";
import { searchJobs } from "@/data-access/job/searchJob";
import { JobSearchTags, locations } from "@/lib/data/SEOData";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { BriefcaseIcon, MapPinIcon, SearchIcon, TagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ location: string; q: string }>;
}

export const revalidate = 86400; // revalidate after 24 hours

export async function generateStaticParams() {
  const jobTags = await prisma.job.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      tags: true,
      skills: true,
    },
  });
  const allTags = jobTags.map((job) => {
    return job.tags.concat(job.skills, JobSearchTags);
  });
  const uniqueTags = [...new Set(allTags.flat())];
  const locationsData = locations;
  return uniqueTags.flatMap((tag) =>
    locationsData.map((location) => ({ location, q: tag }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { location, q } = await params;
  const qDecoded = decodeURIComponent(q);
  const locationDecoded = decodeURIComponent(location);
  const results = await searchJobs(locationDecoded, qDecoded);
  const currentYear = new Date().getFullYear();

  return {
    title: `Top ${results?.length || 0} ${qDecoded} jobs in ${locationDecoded} - Updated ${currentYear}`,
    description: `Find the best ${qDecoded} jobs in ${locationDecoded}. We have a total of ${results?.length || 0} jobs available for you. Updated ${currentYear}`,
    keywords: `${qDecoded}, ${locationDecoded}, jobs, job search, ${qDecoded} jobs, Jobs ${locationDecoded}, jobs in ${locationDecoded}, top jobs in ${locationDecoded}`,
  };
}

const JobPublicPage = async ({ params }: PageProps) => {
  const { location, q } = await params;
  const qDecoded = decodeURIComponent(q);
  const locationDecoded = decodeURIComponent(location);
  const results = await searchJobs(locationDecoded, qDecoded);
  const hasResults = results && results.length > 0;
  const currentYear = new Date().getFullYear();

  // Generate related searches
  const relatedSearches = JobSearchTags.filter(
    (tag) => tag.toLowerCase() !== qDecoded.toLowerCase()
  ).slice(0, 5);

  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-b from-primary/10 to-background py-8">
        <Container>
          <div className="flex flex-col items-center justify-center space-y-3 mb-2">
            <div className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5 text-primary" />
              <Badge
                variant="secondary"
                className="text-base font-medium px-3 py-1"
              >
                {qDecoded}
              </Badge>
              <MapPinIcon className="h-5 w-5 text-primary" />
              <Badge
                variant="outline"
                className="text-base font-medium px-3 py-1"
              >
                {locationDecoded}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-center mt-2">
              {qDecoded} Jobs in {locationDecoded}
            </h1>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Browse our curated list of {qDecoded} positions in {locationDecoded}
            . Updated for {currentYear} with the latest opportunities.
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
                    Found
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
                  No {qDecoded} jobs found in {locationDecoded}
                </h2>
                <p className="text-muted-foreground">
                  We couldn't find any {qDecoded} job listings in{" "}
                  {locationDecoded} at the moment. Please try another search
                  term, location, or check back later.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button asChild>
                    <Link href={`/job/${locationDecoded}`}>
                      All Jobs in {locationDecoded}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/job">Browse All Jobs</Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Related searches section */}
          <div className="mt-12 bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TagIcon className="h-5 w-5 mr-2 text-primary" />
              Related Searches
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedSearches.map((tag) => (
                <Button key={tag} variant="outline" size="sm" asChild>
                  <Link
                    href={`/job/${locationDecoded}/${encodeURIComponent(tag)}`}
                  >
                    {tag} in {locationDecoded}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/10 to-background rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              About {qDecoded} Jobs in {locationDecoded}
            </h2>
            <div className="prose max-w-none text-muted-foreground">
              <p>
                Looking for {qDecoded} jobs in {locationDecoded}? Our
                comprehensive job board features {results?.length || 0}{" "}
                opportunities from leading employers in the area. Whether you're
                an experienced professional or just starting your career in{" "}
                {qDecoded}, our curated list provides valuable insights into the
                local job market.
              </p>
              <p className="mt-4">
                The {qDecoded} sector in {locationDecoded} offers diverse
                opportunities across multiple industries. Our regularly updated
                listings ensure you have access to the latest openings. Bookmark
                this page to stay informed about new {qDecoded} job
                opportunities in {locationDecoded}.
              </p>
              <p className="mt-4">
                Professionals with {qDecoded} skills are in demand in{" "}
                {locationDecoded}. Employers are looking for candidates with
                expertise in this field, offering competitive salaries and
                benefits. Browse our listings to find the perfect match for your
                skills and career goals.
              </p>
            </div>
          </div>
        </Container>
      </main>

      <section className="bg-primary/5 py-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Expand Your Job Search</h2>
            <p className="text-muted-foreground mb-6">
              Explore more opportunities or set up job alerts to be notified
              when new {qDecoded} positions become available in{" "}
              {locationDecoded}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link href={`/job/${locationDecoded}`}>
                  All Jobs in {locationDecoded}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/job">Browse All Jobs</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default JobPublicPage;

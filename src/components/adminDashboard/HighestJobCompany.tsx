import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetCompanyWithHighestJob } from "@/data-access/admin-access/analytics/getRecentUser";
import { Suspense } from "react";
import { Building, AlertCircle, User, Briefcase, Users } from "lucide-react";
import Image from "next/image";

const HighestJobCompany = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Companies</CardTitle>
        <CardDescription>
          Companies with the highest job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<CompanyListSkeleton />}>
          <HighestJobCompanyFetcher />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default HighestJobCompany;

// Loading skeleton for the company list
const CompanyListSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            key={index}
          >
            <div className="h-6 w-6 rounded-full bg-muted animate-pulse flex items-center justify-center shrink-0"></div>

            <div className="h-12 w-12 rounded-md bg-muted animate-pulse shrink-0"></div>

            <div className="space-y-2 flex-1 w-full">
              <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <div className="h-7 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-7 w-20 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <AlertCircle className="h-8 w-8 text-destructive mb-2" />
      <h3 className="font-medium">Failed to load companies data</h3>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Building className="h-8 w-8 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground">No companies found</p>
    </div>
  );
};

const CompanyLogo = ({ logoUrl, name }: { logoUrl: string; name: string }) => {
  if (logoUrl) {
    return (
      <div className="relative h-12 w-12 rounded-md overflow-hidden border border-border">
        <Image
          src={logoUrl}
          alt={`${name} logo`}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
      <Building className="h-6 w-6" />
    </div>
  );
};

const HighestJobCompanyFetcher = async () => {
  try {
    const companies = await GetCompanyWithHighestJob();

    if (!companies || companies.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="space-y-4">
        {companies.map((company, index) => (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
            key={company.id}
          >
            <div className="h-6 w-6 text-base font-semibold text-secondary-foreground shrink-0">
              <p className="flex items-center gap-1 ">
                <span>#</span>
                <span>{index + 1}</span>
              </p>
            </div>

            <CompanyLogo logoUrl={company.logoUrl!} name={company.name} />

            <div className="flex flex-col space-y-1 flex-1 min-w-0 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium truncate">{company.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>
                  Admin: {company.adminEmployer.user.name || "Unknown"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                <Briefcase className="h-3 w-3" />
                <span>{company._count.jobPosted} Jobs</span>
              </div>

              <div className="flex items-center gap-1 text-xs  px-2 py-1 rounded-md">
                <Users className="h-3 w-3" />
                <span>{company._count.members} Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return (
      <ErrorDisplay message="There was an error loading the company data" />
    );
  }
};

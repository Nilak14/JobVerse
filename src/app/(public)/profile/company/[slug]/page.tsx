import BackButton from "@/components/Global/BackButton";
import Container from "@/components/Global/Container";
import NavBar from "@/components/LandingPage/NavBar";
import AdminNav from "@/components/sidebar/AdminNav";
import EmployerNav from "@/components/sidebar/EmployerNav";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
import { getCompanyProfileData } from "@/data-access/users/getProfileData";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ExternalLink,
  MapPin,
  Building,
  Users,
  Calendar,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ContentViewer from "@/components/tiptap/ContentViewer";
import CompanyProfileJob from "@/components/Company/CompanyProfileJob";
import CompanyFollowButton from "@/components/Company/CompanyFollowButton";
import { FollowerResponse } from "@/lib/prisma-types/Company";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  if (!slug) {
    return {
      title: "Company Profile",
      description: "Company Profile",
    };
  }
  const company = await getCompanyProfileData(slug);
  if (!company) {
    return {
      title: "Company Profile",
      description: "Company Profile",
    };
  }
  return {
    title: `${company.name}`,
    description: `Profile for ${company.name}`,
  };
};

const CompanyProfilePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const session = await auth();
  const userType = session?.user.type || null;
  return (
    <>
      {session && userType === "JOB_SEEKER" && (
        <JobSeekerNav user={session.user} hasSidebar={false} />
      )}
      {session && userType === "EMPLOYER" && (
        <EmployerNav user={session.user} hasSidebar={false} />
      )}
      {session && userType === "ADMIN" && (
        <AdminNav user={session.user} hasSidebar={false} />
      )}
      {userType === null && <NavBar />}
      <Container>
        <BackButton className="mt-5" />
        <Suspense fallback={<CompanyProfileSkeleton />}>
          <CompanyProfileDataLoader slug={slug} />
        </Suspense>
      </Container>
    </>
  );
};

export default CompanyProfilePage;

const CompanyProfileSkeleton = () => {
  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Skeleton className="h-24 w-24 rounded-full" />

        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-28" />
                  <div className="flex justify-between pt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const CompanyProfileDataLoader = async ({ slug }: { slug: string }) => {
  const company = await getCompanyProfileData(slug);
  const session = await auth();

  if (!company) {
    return notFound();
  }
  let followerInfo: FollowerResponse | null;
  if (session && session.jobSeekerId) {
    followerInfo = {
      message: "",
      success: true,
      data: {
        data: {
          followers: company._count.followers,
          isFollowedByUser: company.followers.some(
            ({ jobSeekerId }) => jobSeekerId === session?.jobSeekerId
          ),
        },
      },
    };
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 border">
            {company.logoUrl ? (
              <AvatarImage
                src={company.logoUrl || "/placeholder.svg"}
                alt={company.name}
              />
            ) : (
              <AvatarFallback className="text-2xl bg-primary/10">
                {company.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              {company.website && (
                <Link
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors mt-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{company.website}</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {session?.jobSeekerId && (
              <CompanyFollowButton
                initialState={followerInfo!}
                companyId={company.id}
              />
            )}
            <Badge variant="secondary" className="px-3 py-1">
              <Building className="mr-1 h-4 w-4" />
              {company._count.jobPosted} Jobs Posted
            </Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="sr-only">
          <CardTitle>About {company.name}</CardTitle>
          <CardDescription>Company description</CardDescription>
        </CardHeader>
        <CardContent className="mt-5">
          {company.description ? (
            <div>
              <ContentViewer content={company.description} />
            </div>
          ) : (
            <p className="text-muted-foreground italic">
              No company description available.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Jobs at {company.name}</h2>
        </div>
        <CompanyProfileJob companyId={company.id} />
      </div>
    </div>
  );
};

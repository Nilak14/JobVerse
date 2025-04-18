import { getJobSeekerProfileData } from "@/data-access/users/getProfileData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Calendar,
  Building,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import JobSeekerProfileSkeleton from "@/components/skeletons/JobSeekerProfileSkeleton";
import { updateProfileView } from "@/actions/user/updateProfileView";
import BackButton from "@/components/Global/BackButton";
import Container from "@/components/Global/Container";
import JobSeekerNav from "@/components/sidebar/JobSeekerNav";
import { auth } from "@/lib/auth";
import EmployerNav from "@/components/sidebar/EmployerNav";
import AdminNav from "@/components/sidebar/AdminNav";
import NavBar from "@/components/LandingPage/NavBar";
interface PageProps {
  params: Promise<{ slug: string }>;
}
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const userData = await getJobSeekerProfileData(slug);
  if (userData) {
    return {
      title: `${userData.name}`,
      description: `Profile of ${userData.name}`,
    };
  } else {
    return {};
  }
};
const JobSeekerProfilePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const session = await auth();
  const userType = session?.user?.type || null;
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
        <Suspense fallback={<JobSeekerProfileSkeleton />}>
          <JobSeekerProfileDataLoader slug={slug} />
        </Suspense>
      </Container>
    </>
  );
};

export default JobSeekerProfilePage;

const JobSeekerProfileDataLoader = async ({ slug }: { slug: string }) => {
  const profileData = await getJobSeekerProfileData(slug);
  if (!profileData || !profileData.JOB_SEEKER) {
    return notFound();
  }
  const profile = profileData.JOB_SEEKER.JobSeekerProfile;
  if (!profile?.profileVisibility) {
    return notFound();
  }
  await updateProfileView(slug);
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section with Profile Image */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-md">
                <AvatarImage
                  src={profileData.image || "/placeholder.svg"}
                  alt={profileData.name || "Profile Image"}
                />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                  {profileData?.name
                    ? profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3 text-center md:text-left flex-1">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    {profile?.openToWork && (
                      <Badge className="self-center md:self-auto">
                        <CheckCircle className="h-3 w-3 mr-1" /> Open to Work
                      </Badge>
                    )}
                  </div>
                  {profile?.designation && (
                    <p className="text-xl text-muted-foreground">
                      {profile.designation}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {profile?.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{profileData.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Bio */}
            {profile?.bio && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {profile?.skills && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {profile?.Certification && profile.Certification.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.Certification.sort((a, b) => a.order - b.order).map(
                    (cert, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-4 py-1"
                      >
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {formatDate(cert.completionDate)}
                          </span>
                        </div>
                        <h3 className="font-semibold">{cert.title}</h3>
                        <div className="text-sm text-muted-foreground">
                          {cert.instituteName}
                        </div>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Work Experience */}
            {profile?.WorkExperience && profile.WorkExperience.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.WorkExperience.sort((a, b) => a.order - b.order).map(
                    (exp, index) => (
                      <div
                        key={index}
                        className="relative pl-6 border-l-2 border-primary"
                      >
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {exp.position}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {formatDate(exp.startDate)} -{" "}
                              {exp.endDate ? (
                                <>{formatDate(exp.endDate)}</>
                              ) : (
                                "Present"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="mb-2 flex items-center text-muted-foreground">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{exp.companyName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {exp.description}
                        </p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {profile?.Education && profile.Education.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.Education.sort((a, b) => a.order - b.order).map(
                    (edu, index) => (
                      <div
                        key={index}
                        className="relative pl-6 border-l-2 border-primary"
                      >
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {edu.degreeTitle}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {formatDate(edu.startDate)} -{" "}
                              {edu.endDate ? (
                                <>{formatDate(edu.endDate)}</>
                              ) : (
                                "Present"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Building className="h-4 w-4 mr-1" />
                          <span>
                            {edu.instituteName}, {edu.instituteLocation}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

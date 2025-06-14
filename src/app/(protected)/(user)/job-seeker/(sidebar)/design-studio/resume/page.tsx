import CreatedResumeCard from "@/components/Resume/CreatedResumeCard";
import CreateNewResumeButton from "@/components/Resume/CreateNewResumeButton";
import PDFViewer from "@/components/Resume/PDFViewer";
import UploadResumeButton from "@/components/Resume/UploadResumeButton";
import ResumeStudioSkeleton from "@/components/skeletons/ResumeSkeleton";
import BoxReveal from "@/components/ui/box-reveal";
import { getUserAllCreatedResume } from "@/data-access/resume/getUserAllCreatedResume";
import { auth } from "@/lib/auth";
import { FileText } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserUploadedResume } from "@/data-access/resume/getUserUploadedResume";
import ResumePageButtonSkeleton from "@/components/skeletons/ResumePageButtonSkeleton";
import { canCreateResume } from "@/lib/permissions/jobSeeker-permissions";

export const metadata: Metadata = {
  title: "Resume Studio | Manage Your Resumes",
  description: "Create, manage, and optimize your professional resumes",
};

const ResumeStudioPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.jobSeekerId || !session.user.id) {
    return null;
  }

  return (
    <section className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <BoxReveal>
          <div className="space-y-3">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tighter">
              Resume Studio
            </h1>
            <p className="text-sm text-muted-foreground tracking-wide">
              Manage and create professional resumes
            </p>
          </div>
        </BoxReveal>
        <Suspense fallback={<ResumePageButtonSkeleton />}>
          <ResumeStudioPageButton
            jobSeekerId={session.jobSeekerId}
            userId={session.user.id}
          />
        </Suspense>
      </div>
      <Tabs className="space-y-6 mt-8" defaultValue="created">
        <TabsList className="  h-12">
          <TabsTrigger value="created">Created Resume</TabsTrigger>
          <TabsTrigger value="uploaded">Uploaded Resume</TabsTrigger>
        </TabsList>
        <TabsContent value="created">
          <Suspense fallback={<ResumeStudioSkeleton />}>
            <CreatedResume
              jobSeekerId={session.jobSeekerId}
              userId={session.user.id}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="uploaded">
          <Suspense fallback={<ResumeStudioSkeleton />}>
            <UploadedResume
              jobSeekerId={session.jobSeekerId}
              userId={session.user.id}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ResumeStudioPage;
interface ResumeStudioProps {
  jobSeekerId: string;
  userId: string;
}
const CreatedResume = async ({ jobSeekerId, userId }: ResumeStudioProps) => {
  const [resumes, resumeCount, subscriptionLevel] =
    await getUserAllCreatedResume(jobSeekerId, userId);

  const hasResumes = resumeCount > 0;
  return (
    <>
      {hasResumes ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Resumes ({resumeCount})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-left">
            {resumes.map((resume) => (
              <CreatedResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 rounded-lg">
          <FileText className="size-12 mx-auto mb-4" />
          <h3 className="text-xl font-medium">No resumes yet</h3>
          <p className="mt-2 mb-6 max-w-md mx-auto text-muted-foreground">
            Create your first resume to start applying for jobs with confidence
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
            <CreateNewResumeButton
              canCreate={canCreateResume(subscriptionLevel, resumeCount)}
            />
          </div>
        </div>
      )}
    </>
  );
};

const UploadedResume = async ({ jobSeekerId }: ResumeStudioProps) => {
  const [resumes, resumeCount] = await getUserUploadedResume(jobSeekerId);
  const hasResumes = resumeCount > 0;
  return (
    <>
      {hasResumes ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Resumes ({resumeCount})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-left">
            {resumes.map((resume) => (
              <PDFViewer key={resume.id} uploadedResume={resume} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 rounded-lg">
          <FileText className="size-12 mx-auto mb-4" />
          <h3 className="text-xl font-medium">No resumes yet</h3>
          <p className="mt-2 mb-6 max-w-md mx-auto text-muted-foreground">
            Upload your first resume to start applying for jobs with confidence
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
            <UploadResumeButton />
          </div>
        </div>
      )}
    </>
  );
};
const ResumeStudioPageButton = async ({
  jobSeekerId,
  userId,
}: ResumeStudioProps) => {
  const [_, resumeCount, subscriptionLevel] = await getUserAllCreatedResume(
    jobSeekerId,
    userId
  );
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <CreateNewResumeButton
          canCreate={canCreateResume(subscriptionLevel, resumeCount)}
        />
        <UploadResumeButton />
      </div>
    </>
  );
};

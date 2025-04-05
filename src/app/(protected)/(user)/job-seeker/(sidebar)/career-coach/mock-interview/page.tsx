import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import {
  getUserMockInterview,
  getUserMockInterviewWithFeedback,
} from "@/data-access/mock-interview/getUserMockInterview";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Users, Plus, Sparkles } from "lucide-react";
import { InterviewCard } from "@/components/interview/interview-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { refactorInterviewDateForChart } from "@/lib/utils";
import { Inter } from "next/font/google";
import InterviewTrendChart from "@/components/charts/InterviewTrendChart";
export const metadata: Metadata = {
  title: "Mock Interview",
  description: "Practice and prepare for your next job interview",
};

const MockInterviewPage = async () => {
  const session = await auth();
  if (!session || !session.jobSeekerId) {
    return redirect("/");
  }
  return (
    <>
      <section className="space-y-10">
        <div className="flex items-center justify-between ">
          <BoxReveal classname="flex-1">
            <div className="space-y-3 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Mock Interview
              </h1>
              <p className="text-sm text-muted-foreground tracking-wide ">
                Practice and prepare for your next job interview with AI-powered
                mock interviews
              </p>
            </div>
          </BoxReveal>
          <Button asChild className="gap-1.5">
            <Link href="/job-seeker/generate-interview">
              <Plus className="h-4 w-4" />
              Create New Interview
            </Link>
          </Button>
        </div>
        <Suspense>
          <MockInterviewStats userId={session.jobSeekerId} />
        </Suspense>
        <Suspense>
          <MockInterviewChart userId={session.jobSeekerId} />
        </Suspense>
        <Suspense
          fallback={
            <div className="grid gap-4 place-items-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-muted-foreground">
                Loading your interviews...
              </p>
            </div>
          }
        >
          <MockInterviewPageDataLoader userId={session.jobSeekerId} />
        </Suspense>
      </section>
    </>
  );
};
export default MockInterviewPage;

const MockInterviewPageDataLoader = async ({ userId }: { userId: string }) => {
  const mockInterviews = await getUserMockInterview(userId);

  if (!mockInterviews || mockInterviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-primary/10 p-6 mb-6">
          <Users className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">No interviews yet</h3>
        <p className="text-muted-foreground mb-8 max-w-md">
          Create your first mock interview to practice and prepare for your next
          job opportunity.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link href="/job-seeker/generate-interview">
            <Sparkles className="h-4 w-4" />
            Create Your First Interview
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInterviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            jobseekerId={userId}
            interview={interview}
          />
        ))}
      </div>
    </div>
  );
};

const MockInterviewStats = async ({ userId }: { userId: string }) => {
  const mockInterviews = await getUserMockInterviewWithFeedback(userId);
  const totalInterviews = mockInterviews.length;
  let totalScore = 0;
  let feedbackCount = 0;
  console.log(mockInterviews);
  for (const interview of mockInterviews) {
    for (const feedback of interview.MockInterviewFeedback) {
      totalScore += feedback.totalScore || 0;
      feedbackCount++;
    }
  }
  const averageScore = feedbackCount > 0 ? totalScore / feedbackCount : 0;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalInterviews ? (
              <NumberTicker
                value={totalInterviews}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
          </div>
          <p className="text-muted-foreground text-sm">Interview Taken</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {averageScore ? (
              <NumberTicker
                value={averageScore}
                className="whitespace-pre-wrap   tracking-tighter text-black dark:text-white"
              />
            ) : (
              0
            )}
            %
          </div>
          <p className="text-muted-foreground text-sm">
            Across all interview taken
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const MockInterviewChart = async ({ userId }: { userId: string }) => {
  const mockInterviews = await getUserMockInterviewWithFeedback(userId);
  const data = refactorInterviewDateForChart(mockInterviews);
  return <InterviewTrendChart data={data} />;
};

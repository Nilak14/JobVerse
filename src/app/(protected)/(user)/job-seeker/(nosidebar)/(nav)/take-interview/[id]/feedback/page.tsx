import BackButton from "@/components/Global/BackButton";
import Container from "@/components/Global/Container";
import Feedback from "@/components/interview/feedback/Feedback";
import FeedbackSkeleton from "@/components/skeletons/InterviewFeedbackSkeleton";
import { getInterviewFeedback } from "@/data-access/mock-interview/getInterviewFeedback";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
interface PageProps {
  params: Promise<{ id: string }>;
}
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { id } = await params;
  const session = await auth();
  if (!session || !session.jobSeekerId) {
    return {};
  }
  const feedback = await getInterviewFeedback({
    interviewId: id,
    userId: session.jobSeekerId,
  });
  return {
    title: `${feedback?.mockInterview.role} Interview Feedback`,
    description: `Feedback for ${feedback?.mockInterview.role} interview`,
  };
};
const MockInterviewFeedbackPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const session = await auth();
  if (!session || !session.jobSeekerId) {
    return notFound();
  }

  return (
    <Container>
      <BackButton
        className="mt-4"
        href="/job-seeker/career-coach/mock-interview"
      />
      <Suspense fallback={<FeedbackSkeleton />}>
        <MockInterviewFeedbackPageDataLoader
          interviewId={id}
          userId={session.jobSeekerId}
        />
      </Suspense>
    </Container>
  );
};
export default MockInterviewFeedbackPage;

const MockInterviewFeedbackPageDataLoader = async ({
  interviewId,
  userId,
}: {
  interviewId: string;
  userId: string;
}) => {
  const feedback = await getInterviewFeedback({ interviewId, userId });
  if (!feedback) {
    return notFound();
  }
  return <Feedback feedback={feedback} />;
};

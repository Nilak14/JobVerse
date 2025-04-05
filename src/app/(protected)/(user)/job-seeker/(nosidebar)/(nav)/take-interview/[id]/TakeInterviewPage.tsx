"use client";
import Agent from "@/components/interview/Agent";
import BlockLoader from "@/components/ui/block-loader";
import { MockInterviewData } from "@/lib/prisma-types/MockInterview";
import { Session } from "next-auth";
import { useTransition } from "react";

interface TakeInterviewPageProps {
  session: Session;
  mockInterview: MockInterviewData;
}
const TakeInterviewPage = ({
  mockInterview,
  session,
}: TakeInterviewPageProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <BlockLoader textContent="Generating Feedback" isLoading={isPending} />
      <Agent
        startTransition={startTransition}
        session={session}
        type={"practice"}
        interviewId={mockInterview.id}
        questions={mockInterview.questions}
      />
    </>
  );
};
export default TakeInterviewPage;

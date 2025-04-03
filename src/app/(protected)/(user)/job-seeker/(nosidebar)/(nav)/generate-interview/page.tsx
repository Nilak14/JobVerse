import Container from "@/components/Global/Container";
import Agent from "@/components/interview/Agent";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const GenerateMockInterviewCallPage = async () => {
  const session = await auth();
  if (!session || !session.jobSeekerId) {
    redirect("/");
  }
  return (
    <Container className="w-full h-full">
      <h3>Interview Generation</h3>
      <Agent session={session} type="generate" />
    </Container>
  );
};
export default GenerateMockInterviewCallPage;

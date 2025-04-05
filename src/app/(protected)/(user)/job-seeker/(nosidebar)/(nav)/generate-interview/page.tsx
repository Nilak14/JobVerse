import BackButton from "@/components/Global/BackButton";
import Container from "@/components/Global/Container";
import Agent from "@/components/interview/Agent";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { Briefcase, CheckCircle2, Lightbulb, Mic } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Generate Mock Interview",
  description: "Generate a mock interview using AI",
};

const GenerateMockInterviewCallPage = async () => {
  const session = await auth();
  if (!session || !session.jobSeekerId) {
    redirect("/");
  }

  return (
    <>
      <Container className="w-full h-full">
        <BackButton
          href="/job-seeker/career-coach/mock-interview"
          className="mt-5"
        />
        <Card className="my-8 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Generate AI Mock Interview
            </CardTitle>
            <CardDescription>
              This is not an interview. These questions help generate a
              personalized interview for you. Once completed, you’ll be
              redirected to your interview session.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Agent session={session} type="generate" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Mic className="h-6 w-6" />}
                  title="Voice Interaction"
                  description="Our AI interviewer will ask you questions through voice and listen to your responses"
                />

                <FeatureCard
                  icon={<Briefcase className="h-6 w-6" />}
                  title="Customized Experience"
                  description="The AI will ask about your experience level, tech stack, and interview preferences"
                />

                <FeatureCard
                  icon={<CheckCircle2 className="h-6 w-6" />}
                  title="Detailed Feedback"
                  description="Receive personalized feedback and improvement suggestions after your interview"
                />
              </div>

              <Separator className="bg-primary/20" />

              <div className="bg-secondary/20 p-4 rounded-lg border border-secondary/20">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary mb-2">
                      Tips for a successful mock interview:
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                      <li>
                        Find a quiet environment with minimal background noise
                      </li>
                      <li>Speak clearly and at a normal pace</li>
                      <li>
                        Prepare to discuss your experience level and preferred
                        technologies
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
export default GenerateMockInterviewCallPage;
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
      <div className="bg-primary/10 text-primary p-3 rounded-full mb-3">
        {icon}
      </div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

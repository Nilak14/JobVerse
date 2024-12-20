import { auth } from "@/lib/auth";
import Container from "@/components/Global/Container";
import EmployerNav from "@/components/sidebar/EmployerNav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import OnBoardingCard from "./onboardingCard";
import BoxReveal from "@/components/ui/box-reveal";
export const metadata: Metadata = {
  title: "Onboarding",
  description: "Employer Onboarding page",
};

const EmployerOnboardingPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.type !== "EMPLOYER") {
    redirect("/login");
  }
  const employer = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      EMPLOYER: {
        include: {
          companies: true,
        },
      },
    },
  });

  const isOnCompany = employer?.EMPLOYER?.companies.length;
  if (isOnCompany) {
    redirect("/employer/dashboard");
  }
  return (
    <SidebarProvider>
      <SidebarInset className="h-dvh">
        <EmployerNav activeCompanyId={session.activeCompanyId} user={user} />
        <Container>
          <main className="flex flex-col items-center justify-center h-full">
            <div>
              <BoxReveal boxColor={"gray"} duration={0.2}>
                <h1 className="text-3xl">
                  <span className="">Welcome,</span> <br />
                  <span className="font-bold tracking-wider">{user.name}</span>
                </h1>
              </BoxReveal>
              <BoxReveal boxColor={"gray"} duration={0.4}>
                <p className="text-muted-foreground mt-2">
                  Welcome To JobVerse.Lets get started by setting up your
                  account
                </p>
              </BoxReveal>
              <OnBoardingCard user={user} />
            </div>
          </main>
        </Container>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default EmployerOnboardingPage;

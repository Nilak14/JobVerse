import { signOut } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding (JobSeeker)",
};

const JobSeekerOnBoardingPage = () => {
  return (
    <section className="flex h-dvh w-dvw">
      <article className="hidden lg:block flex-1 bg-primary"></article>
      <article className=" flex-1"></article>
    </section>
  );
};
export default JobSeekerOnBoardingPage;

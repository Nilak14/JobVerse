import { Metadata } from "next";
import Onboarding from "./Onboarding";

export const metadata: Metadata = {
  title: "Onboarding (JobSeeker)",
};

const JobSeekerOnBoardingPage = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-dvh w-dvw">
      <Onboarding />
    </section>
  );
};
export default JobSeekerOnBoardingPage;

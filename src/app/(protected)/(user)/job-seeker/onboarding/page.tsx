import { Metadata } from "next";
import Onboarding from "./Onboarding";
import Container from "@/components/Global/Container";

export const metadata: Metadata = {
  title: "Onboarding (JobSeeker)",
};

const JobSeekerOnBoardingPage = () => {
  return (
    <section className="grid relative place-content-center pb-32 overflow-hidden  ">
      <Container>
        <Onboarding />
      </Container>
    </section>
  );
};
export default JobSeekerOnBoardingPage;

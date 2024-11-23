"use client";
import BreadCrumb from "@/components/onboarding/BreadCrumb";
import { job_seeker_onboarding_steps } from "@/lib/steps";
import { useSearchParams } from "next/navigation";
import OnboardingButton from "@/components/onboarding/OnboardingButton";
import { JobSeekerOnboardingSchema } from "@/schema/JobSeekerOnboardingSchema";
import { useState } from "react";
import { Logo } from "@/components/LandingPage/NavBar";
import Particles from "@/components/ui/particles";
import Image from "next/image";

const Onboarding = () => {
  const searchParams = useSearchParams();
  const [onBoardingData, setOnBoardingData] =
    useState<JobSeekerOnboardingSchema>({
      fullName: "",
      phoneNumber: "",
    });
  const currentStep =
    searchParams.get("step") || job_seeker_onboarding_steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };
  const FormComponent = job_seeker_onboarding_steps.find(
    (step) => step.key === currentStep
  )?.component;
  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2  lg:left-32 top-5 lg:translate-x-0 ">
        <Logo height="35" width="35" textSize="text-2xl" />
      </div>
      {/* image section */}
      <article className="hidden bg-primary lg:grid place-content-center  border-white">
        <Image
          height={1340}
          width={1340}
          src={"/mockups/onboarding.png"}
          alt="Mockup"
        />
        <p className="text-white text-xl text-center text-pretty font-mono ">
          We're excited to help you kickstart your career journey. <br /> Let's
          create your profile first!
        </p>
      </article>
      {/* form section */}
      <article className="relative overflow-x-hidden  flex items-center justify-center flex-col ">
        <Particles
          className="absolute inset-0"
          quantity={500}
          ease={80}
          // color={"white"}
          refresh
        />
        <div className=" absolute top-28 lg:top-10 text-center z-20 ">
          <h1 className="text-2xl font-bold tracking-wider mb-9 hidden lg:block">
            Welcome To{" "}
            <span className="text-primary  tracking-wide">JobVerse</span>
          </h1>
        </div>
        <BreadCrumb
          currentStep={currentStep}
          setCurrentStep={setStep}
          steps={job_seeker_onboarding_steps}
        />
        <div className="w-[350px] md:w-[450px] xl:w-[600px] z-30  ">
          {FormComponent && (
            <FormComponent
              jobSeekerFormData={onBoardingData}
              setJobSeekerFormData={setOnBoardingData}
            />
          )}
          <OnboardingButton
            currentStep={currentStep}
            setCurrentStep={setStep}
            steps={job_seeker_onboarding_steps}
          />
          {JSON.stringify(onBoardingData, null, 2)}
        </div>
      </article>
    </>
  );
};
export default Onboarding;

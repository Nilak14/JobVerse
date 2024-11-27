"use client";
import BreadCrumb from "@/components/onboarding/BreadCrumb";
import { job_seeker_onboarding_steps } from "@/lib/steps";
import { useSearchParams } from "next/navigation";
import Particles from "@/components/ui/particles";
import UseCurrentSession from "@/hooks/use-session";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Onboarding = () => {
  UseCurrentSession(); // get the session for client side component
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
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
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  return (
    <>
      <Particles
        className="absolute inset-0"
        quantity={500}
        ease={80}
        color={color}
        refresh
      />
      <article className="grid place-content-center mt-10 ">
        <div className="mb-9 space-y-3">
          <h1 className="text-2xl font-bold tracking-wider  text-center ">
            Welcome To{" "}
            <span className="text-primary  tracking-wide">JobVerse</span>
          </h1>
          <p className="text-muted-foreground text-sm text-center text-pretty  ">
            We're excited to help you kickstart your career journey.{" "}
            <br className="hidden sm:block" /> Let's create your profile first!
          </p>
        </div>
        <BreadCrumb
          currentStep={currentStep}
          setCurrentStep={setStep}
          steps={job_seeker_onboarding_steps}
        />
        <div className="z-30 mx-auto mt-10 ">
          {FormComponent && <FormComponent setCurrentStep={setStep} />}
        </div>
      </article>
    </>
  );
};
export default Onboarding;

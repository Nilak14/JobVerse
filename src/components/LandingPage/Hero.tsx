import { cn } from "@/lib/utils";
import AnimateWrapper from "../Global/AnimateWrapper";
import Container from "../Global/Container";
import DotPattern from "../ui/dot-pattern";
import AnimatedShinyText from "../ui/animated-shiny-text";

import { RainbowButton } from "../ui/rainbow-button";
import { ArrowRightIcon, CreditCardIcon, Dot, TimerIcon } from "lucide-react";

const Hero = () => {
  return (
    <Container className=" h-[calc(100vh-64px)]  ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)] opacity-50 hidden md:block -z-[5]"
        )}
      />
      <div className="bg-primary w-96 aspect-square blur-[15rem] absolute left-1/2 -translate-x-1/2 top-0 -z-10"></div>
      <AnimateWrapper className="flex justify-center items-center">
        <section className="text-center flex flex-col items-center justify-center gap-10">
          <div
            className={cn(
              "group rounded-full hidden sm:block border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="flex items-center gap-2 text-sm">
                <span className="bg-primary text-white h-4 w-11 rounded-full inline-block  text-xs">
                  New
                </span>
                Discover Our Latest AI-Powered Features
              </span>
            </AnimatedShinyText>
          </div>
          <h2 className="pointer-events-none whitespace-pre-wrap  text-center text-4xl md:text-6xl lg:text-7xl font-bold   leading-10">
            <span className="bg-gradient-to-b from-black to-gray-300 bg-clip-text text-transparent dark:from-white dark:to-slate-900 ">
              Discover Your Ideal
            </span>
            <br />
            <span className="bg-gradient-to-b from-primary to-gray-300 bg-clip-text text-transparent dark:from-primary dark:to-primary-900 ">
              Job Opportunity & <br /> Find Top Talent{" "}
            </span>{" "}
            <br />
            <span className="bg-gradient-to-b from-black to-gray-300 bg-clip-text text-transparent dark:from-white dark:to-slate-900">
              Faster with JobVerse Today
            </span>
          </h2>
          <p className="max-w-[100ch] text-slate-300 text-center tracking-wider text-pretty text-base">
            Build your resume, follow companies, and apply with a click, or find
            top talent with our powerful hiring tools. Whether you&apos;re
            looking for your next opportunity or the perfect hire,{" "}
            <span className="text-primary font-semibold"> JobVerse</span> is
            here for you!
          </p>
          <div className="relative">
            <RainbowButton className="dark:text-black text-white flex gap-2 p-5 ">
              Start for Free <ArrowRightIcon />
            </RainbowButton>
            <div className=" absolute  min-w-max -left-1/2 flex justify-between text-xs text-muted-foreground mt-5">
              <p className="flex items-center gap-2">
                <TimerIcon size={15} />
                14 Days Free Trial
              </p>
              <Dot />
              <p className="flex items-center gap-2">
                <CreditCardIcon size={15} />
                No Credit Card Required.
              </p>
            </div>
          </div>
        </section>
      </AnimateWrapper>
    </Container>
  );
};
export default Hero;

import { cn } from "@/lib/utils";
import AnimateWrapper from "../Global/AnimateWrapper";
import Container from "../Global/Container";
import DotPattern from "../ui/dot-pattern";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { CreditCardIcon, Dot, TimerIcon } from "lucide-react";
import Side from "./Side";
import AnimateBadge from "../Global/AnimateBadge";
import GetStartedButton from "../ui/get-started-button";

const Hero = () => {
  return (
    <Container className=" pt-10 pb-36 relative overflow-x-hidden  ">
      <DotPattern
        className={cn(
          " [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] hidden md:block  -z-[5]"
        )}
      />
      <div className="bg-primary w-56  md:w-64 aspect-square blur-[10rem] absolute left-1/2 -translate-x-1/2 top-0 -z-10"></div>
      <Container className="hidden lg:flex items-center justify-between   absolute inset-0   ">
        <div>
          <AnimateBadge reverse>
            <Side content="Backend Developer" />
          </AnimateBadge>
          <AnimateBadge className="absolute bottom-[20%] left-[20%]" reverse>
            <Side content="FrontEnd Developer" />
          </AnimateBadge>
        </div>
        <div>
          <AnimateBadge>
            <Side content="Accountant" rotate />
          </AnimateBadge>

          <AnimateBadge className="absolute bottom-[20%] right-[20%]">
            <Side content="Sales Officer" rotate />
          </AnimateBadge>
        </div>
      </Container>
      <AnimateWrapper className="mt-12">
        <section className="text-center flex flex-col items-center justify-center h-[80%] gap-10">
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-pretty !leading-tight">
            <span className="text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text font-bold !leading-tight ">
              Empowering
            </span>{" "}
            <span className="text-primary">
              Job Seekers & <br className="hidden md:block" /> Employers
            </span>{" "}
            <span className="text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text font-bold !leading-tight ">
              for Mutual Success
            </span>
          </h1>

          <p className=" w-[90%] md:w-2/3 lg:w-1/2 text-slate-300 text-center tracking-wider text-pretty text-base">
            Build your resume, follow companies, and apply effortlessly, or
            discover top talent with our hiring tools. Whether you&apos;re job
            hunting or hiring, JobVerse got you covered!
          </p>
          <GetStartedButton />
          <div className="relative text-center -mt-6 ">
            <div className="w-screen flex items-center justify-center gap text-xs text-muted-foreground ">
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

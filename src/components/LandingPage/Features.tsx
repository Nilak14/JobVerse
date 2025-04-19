// import { FEATURES } from "@/constants";

import Image from "next/image";

import { MagicCard } from "../ui/magic-card";

import {
  ChartColumnBigIcon,
  DatabaseIcon,
  TrendingUpIcon,
  WandSparklesIcon,
  ZapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DelayContainer from "../Global/DelayContainer";

export const FEATURES = [
  {
    title: "Smart Job Recommendation",
    description:
      "Get personalized job matches based on your skills, experience, and preferences.",
    icon: WandSparklesIcon, // you can keep the same “sparkle” icon
    image: "/images/feature-two.svg",
  },
  {
    title: "Talent Analytics",
    description:
      "Visualize your candidate pipeline and hiring trends to make data-backed decisions in real time.",
    icon: ChartColumnBigIcon,
    image: "/images/feature-one.svg",
  },
  {
    title: "Profile & Resume Hub",
    description:
      "Store, update, and optimize your profile and resume in one centralized, easy-to-manage place.",
    icon: DatabaseIcon,
    image: "/images/feature-three.svg",
  },
  {
    title: "Real-Time Application Tracker",
    description:
      "Get instant updates on every application, interview invitation, and hiring stage.",
    icon: TrendingUpIcon,
    image: "/images/feature-four.svg",
  },
  {
    title: "Dynamic Resume Optimizer",
    description:
      "Let AI suggest tailored tweaks to your resume so you stand out for each unique role.",
    icon: ZapIcon,
    image: "/images/feature-five.svg",
  },
];

const Features = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-20">
      <DelayContainer>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            AI-Powered Hiring Made
            <span className="font-subheading italic">simple</span>
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Transform the way you find and be found. From smart job matching to
            dynamic resume optimization, JobVerse’s AI tools help employers and
            candidates connect faster, smarter, and with more confidence.
          </p>
        </div>
      </DelayContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 relative overflow-visible">
        {FEATURES.map((feature, index) => (
          <DelayContainer
            delay={0.1 + index * 0.1}
            key={feature.title}
            className={cn(
              "relative flex flex-col rounded-2xl lg:rounded-3xl bg-card border border-border/50 hover:border-border/100 transition-colors",
              index === 3 && "lg:col-span-2",
              index === 2 && "md:col-span-2 lg:col-span-1"
            )}
          >
            <MagicCard
              // gradientFrom="#38bdf8"
              // gradientTo="#3b82f6"
              className="p-4 lg:p-6 lg:rounded-3xl"
              gradientColor="rgba(59,130,246,0.1)"
            >
              <div className="flex items-center space-x-4 mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <feature.icon className="size-5 text-primary" />
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>

              <div className="mt-6 w-full bg-card/50 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </MagicCard>
          </DelayContainer>
        ))}
      </div>
    </div>
  );
};

export default Features;

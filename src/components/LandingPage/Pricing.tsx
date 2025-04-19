"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const JOB_SEEKER_PLANS = [
  {
    name: "Free",
    info: "Basic features for job seekers",
    price: {
      monthly: 0,
    },
    features: [
      { text: "Apply to jobs", tooltip: "Unlimited applications" },
      { text: "Create resume", tooltip: "1 resume" },
      { text: "AI-generated resume", tooltip: "Not Available" },
      { text: "Customize resume", tooltip: "Not Available" },
      { text: "Mock voice interview", tooltip: "Not Available" },
    ],
    btn: {
      text: "Start For Free",
      href: "/register/job_seeker",
      variant: "default",
    },
  },
  {
    name: "Pro",
    info: "Advanced features for serious job seekers",
    price: {
      monthly: 9.99,
    },
    features: [
      { text: "Apply to jobs", tooltip: "Unlimited applications" },
      { text: "Create resume", tooltip: "Up to 5 resumes" },
      { text: "AI-generated resume", tooltip: "Available" },
      { text: "Customize resume", tooltip: "Not Available" },
      { text: "Mock voice interview", tooltip: "Not Available" },
    ],
    btn: {
      text: "Upgrade to Pro",
      href: "/register/job_seeker",
      variant: "default",
    },
  },
  {
    name: "Elite",
    info: "Premium features for career professionals",
    price: {
      monthly: 19.99,
    },
    features: [
      { text: "Apply to jobs", tooltip: "Unlimited applications" },
      { text: "Create resume", tooltip: "Unlimited resumes" },
      { text: "AI-generated resume", tooltip: "Available" },
      { text: "Customize resume", tooltip: "Available" },
      { text: "Mock voice interview", tooltip: "Available" },
    ],
    btn: {
      text: "Upgrade to Elite",
      href: "/register/job_seeker",
      variant: "orange",
    },
  },
];
export const EMPLOYER_PLANS = [
  {
    name: "Free",
    info: "Basic features for companies",
    price: {
      monthly: 0,
    },
    features: [
      { text: "Create job posts", tooltip: "Up to 5 job postings" },
      { text: "AI features", tooltip: "Not Available" },
      { text: "Generate job embeddings", tooltip: "Not Available" },
      { text: "Customize job embeddings", tooltip: "Not Available" },
      { text: "Applicant Matching Rating", tooltip: "Not Available" },
    ],
    btn: {
      text: "Start For Free",
      href: "/register/employer",
      variant: "default",
    },
  },
  {
    name: "Pro",
    info: "Advanced features to manage job postings",
    price: {
      monthly: 9.99,
    },
    features: [
      { text: "Create job posts", tooltip: "Up to 10 job postings" },
      { text: "AI features", tooltip: "Available" },
      { text: "Generate job embeddings", tooltip: "Available" },
      { text: "Customize job embeddings", tooltip: "Not Available" },
      { text: "Applicant Matching Rating", tooltip: "Not Available" },
    ],
    btn: {
      text: "Upgrade to Pro",
      href: "/register/employer",
      variant: "default",
    },
  },
  {
    name: "Elite",
    info: "Premium hiring tools for growth-focused companies",
    price: {
      monthly: 19.99,
    },
    features: [
      { text: "Create job posts", tooltip: "Unlimited job postings" },
      { text: "AI features", tooltip: "Available" },
      { text: "Generate job embeddings", tooltip: "Available" },
      { text: "Customize job embeddings", tooltip: "Available" },
      { text: "Applicant Matching Rating", tooltip: "Available" },
    ],
    btn: {
      text: "Upgrade to Elite",
      href: "/register/employer",
      variant: "orange",
    },
  },
];

type Tab = "job-seeker" | "employer";

const PricingCards = () => {
  const MotionTabTrigger = motion(TabsTrigger);

  const [activeTab, setActiveTab] = useState<Tab>("job-seeker");

  return (
    <div>
      <div className="flex flex-col items-center lg:items-center justify-center w-full py-8  mx-auto">
        <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
          Choose a plan that works for you
        </h2>
        <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground ">
          Get started with JobVerse today and enjoy more features with our
          subscription plans.
        </p>
      </div>
      <Tabs
        defaultValue="job-seeker"
        className="w-full flex flex-col items-center justify-center"
      >
        <TabsList>
          <MotionTabTrigger
            value="job-seeker"
            onClick={() => setActiveTab("job-seeker")}
            className="relative"
          >
            {activeTab === "job-seeker" && (
              <motion.div
                layoutId="active-tab-indicator"
                transition={{
                  type: "spring",
                  bounce: 0.5,
                }}
                className="absolute top-0 left-0 w-full h-full bg-background shadow-sm rounded-md z-10"
              />
            )}
            <span className="z-20">Job Seeker</span>
          </MotionTabTrigger>
          <MotionTabTrigger
            value="employer"
            onClick={() => setActiveTab("employer")}
            className="relative"
          >
            {activeTab === "employer" && (
              <motion.div
                layoutId="active-tab-indicator"
                transition={{
                  type: "spring",
                  bounce: 0.5,
                }}
                className="absolute top-0 left-0 w-full h-full bg-background shadow-sm rounded-md z-10"
              />
            )}
            <span className="z-20">Employer</span>
          </MotionTabTrigger>
        </TabsList>

        <TabsContent
          value="job-seeker"
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 flex-wrap max-w-5xl mx-auto pt-6"
        >
          {JOB_SEEKER_PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col w-full border-border rounded-xl",
                plan.name === "Elite" && "border-2 border-primary"
              )}
            >
              <CardHeader
                className={cn(
                  "border-b border-border",
                  plan.name === "Elite"
                    ? "bg-orange-500/[0.07]"
                    : "bg-foreground/[0.03]"
                )}
              >
                <CardTitle
                  className={cn(
                    plan.name !== "Pro" && "text-muted-foreground",
                    "text-lg font-medium"
                  )}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.info}</CardDescription>
                <h5 className="text-3xl font-semibold">
                  ${plan.price.monthly}
                  <span className="text-base text-muted-foreground font-normal">
                    {plan.name !== "Free" ? "/month" : ""}
                  </span>
                </h5>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="text-primary w-4 h-4" />
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <p
                            className={cn(
                              feature.tooltip &&
                                "border-b !border-dashed border-border cursor-pointer",
                              feature.tooltip === "Not Available" &&
                                "text-muted-foreground line-through"
                            )}
                          >
                            {feature.text}
                          </p>
                        </TooltipTrigger>
                        {feature.tooltip && (
                          <TooltipContent>
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="w-full mt-auto">
                <Button
                  className="w-full"
                  asChild
                  variant={
                    plan.btn.variant === "orange" ? "default" : "secondary"
                  }
                >
                  <Link href={plan.btn.href}>{plan.btn.text}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent
          value="employer"
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 flex-wrap max-w-5xl mx-auto pt-6"
        >
          {EMPLOYER_PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col w-full border-border rounded-xl",
                plan.name === "Elite" && "border-2 border-primary"
              )}
            >
              <CardHeader
                className={cn(
                  "border-b border-border",
                  plan.name === "Elite"
                    ? "bg-orange-500/[0.07]"
                    : "bg-foreground/[0.03]"
                )}
              >
                <CardTitle
                  className={cn(
                    plan.name !== "Pro" && "text-muted-foreground",
                    "text-lg font-medium"
                  )}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.info}</CardDescription>
                <h5 className="text-3xl font-semibold flex items-end">
                  ${plan.price.monthly}
                  <div className="text-base text-muted-foreground font-normal">
                    {plan.name !== "Free" ? "/month" : ""}
                  </div>
                </h5>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="text-primary w-4 h-4" />
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <p
                            className={cn(
                              feature.tooltip &&
                                "border-b !border-dashed border-border cursor-pointer",
                              feature.tooltip === "Not Available" &&
                                "text-muted-foreground line-through"
                            )}
                          >
                            {feature.text}
                          </p>
                        </TooltipTrigger>
                        {feature.tooltip && (
                          <TooltipContent>
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="w-full pt- mt-auto">
                <Button
                  className="w-full"
                  asChild
                  variant={
                    plan.btn.variant === "orange" ? "default" : "secondary"
                  }
                >
                  <Link href={plan.btn.href}>{plan.btn.text}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingCards;

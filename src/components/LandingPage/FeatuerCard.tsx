import { cn } from "@/lib/utils";
import {
  MapPinIcon,
  FileTextIcon,
  Mic2Icon,
  BookmarkIcon,
  SendIcon,
  Building2Icon,
  UserPlus2Icon,
  SlackIcon,
  LinkedinIcon,
  ZapIcon,
  PercentIcon,
  CodeIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";

export function FeaturesCard() {
  const features = [
    {
      title: "Nearby Job Alerts",
      description:
        "Location‑based job notifications delivered to you in real‑time.",
      icon: <MapPinIcon className="h-6 w-6 text-orange-500" />,
      of: "Job-Seeker",
    },
    {
      title: "AI Resume Builder",
      description: "Smart AI‑driven resume creation with downloadable PDF.",
      icon: <FileTextIcon className="h-6 w-6 text-orange-500" />,
      of: "Job-Seeker",
    },
    {
      title: "Voice Mock Interviews",
      description:
        "Practice with voice‑based AI mock interviews for perfect preparation.",
      icon: <Mic2Icon className="h-6 w-6 text-orange-500" />,
      of: "Job-Seeker",
    },
    {
      title: "Bookmark Jobs",
      description: "Save interesting job posts to revisit and apply later.",
      icon: <BookmarkIcon className="h-6 w-6 text-orange-500" />,
      of: "Job-Seeker",
    },
    {
      title: "Easy Applications",
      description: "Simple and intuitive one‑click job application process.",
      icon: <SendIcon className="h-6 w-6 text-orange-500" />,
      of: "Job-Seeker",
    },
    {
      title: "Multi‑Company Management",
      description: "Create and manage multiple companies under one account.",
      icon: <Building2Icon className="h-6 w-6 text-orange-500" />,
      of: "Employers",
    },
    {
      title: "Team Collaboration",
      description:
        "Invite team members to collaborate on hiring within your company.",
      icon: <UserPlus2Icon className="h-6 w-6 text-orange-500" />,
      of: "Employers",
    },
    {
      title: "Slack Integration",
      description:
        "Get instant applicant notifications in your Slack channels.",
      icon: <SlackIcon className="h-6 w-6 text-orange-500" />,
      of: "Employers",
    },
    {
      title: "LinkedIn Sync",
      description:
        "One‑click LinkedIn integration to share job posts directly.",
      icon: <LinkedinIcon className="h-6 w-6 text-orange-500" />,
      of: "Employers",
    },
    {
      title: "AI JD Generator",
      description: "Generate detailed job descriptions with AI assistance.",
      icon: <ZapIcon className="h-6 w-6 text-orange-500" />,
      of: "Employers",
    },
    {
      title: "Suitability Scores",
      description: "View applicants with AI‑generated fit scores (0–100).",
      icon: <PercentIcon className="h-6 w-6 text-orange-500" />,
      of: "Employers",
    },
    {
      title: "Embeddable Posts",
      description: "Embed job posts on any website using a simple script tag.",
      icon: <CodeIcon className="h-6 w-6 text-orange-500" />,
      of: "Employers",
    },
  ];

  return (
    <div className="relative">
      <h3 className="md:text-3xl text-xl  font-semibold">
        Discover What JobVerse Offers
      </h3>
      <p className="text-base text-muted-foreground mt-2 ">
        JobVerse delivers real-time job alerts, AI-powered resumes, voice mock
        interviews, one-click applications, team collaboration, smart
        integrations, and embeddable job posts—all in one seamless platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>

      <div className="hidden md:block absolute   w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10 left-1/2 -translate-x-1/2 -bottom-36 opacity-50"></div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  of,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  of: string;
}) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
          (index === 0 || index === 4) && "lg:border-l",
          index < 4 && "lg:border-b"
        )}
      >
        {index < 4 ? (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        ) : (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}

        {/* Icon */}
        <div className="flex items-center justify-between ">
          <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
            {icon}
          </div>
          <div className="pr-5">
            <Badge>{of}</Badge>
          </div>
        </div>

        {/* Title with side accent */}
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
          {description}
        </p>
      </div>
    </>
  );
};

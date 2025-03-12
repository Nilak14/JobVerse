import { LandingPageNavLinks } from "./types";

// NavLinks for landing page
export const NavLinks: LandingPageNavLinks[] = [
  {
    name: "Home",
    href: "#",
  },
  { name: "Pricing", href: "#" },

  {
    name: "About",
    href: "#",
  },

  {
    name: "Contact",
    href: "#",
  },
];

export const JobSeekerPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic features for job seekers",
    features: {
      applyJob: { value: "Unlimited", available: true },
      createResume: { value: "1 resumes", available: true },
      customizeResume: { value: "Not Available", available: false },
      createResumeAI: { value: "Not Available", available: false },
    },
    popular: false,
    buttonText: "Current Plan",
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Advanced features for serious job seekers",
    features: {
      applyJob: { value: "Unlimited", available: true },
      createResume: { value: "5 resumes", available: true },
      customizeResume: { value: "Not Available", available: false },
      createResumeAI: { value: "Available", available: true },
    },
    popular: true,
    buttonText: "Upgrade to Pro",
  },
  {
    name: "Elite",
    price: "$19.99",
    description: "Premium features for career professionals",
    features: {
      applyJob: { value: "Unlimited", available: true },
      createResume: { value: "Unlimited", available: true },
      customizeResume: { value: "Available", available: true },
      createResumeAI: { value: "Available", available: true },
    },
    popular: false,
    buttonText: "Upgrade to Elite",
  },
];

export const JobSeekerProFeatures = [
  {
    name: "Apply Job",
    value: "Unlimited",
    avaliable: true,
  },
  {
    name: "Create Resume",
    value: "5 resumes",
    avaliable: true,
  },

  {
    name: "Get AI Features",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Customize Resume",
    value: "Not Available",
    avaliable: false,
  },
];

export const JobSeekerEliteFeatures = [
  {
    name: "Apply Job",
    value: "Unlimited",
    avaliable: true,
  },
  {
    name: "Create Resume",
    value: "Unlimited",
    avaliable: true,
  },

  {
    name: "Get AI Features",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Customize Resume",
    value: "Available",
    avaliable: true,
  },
];

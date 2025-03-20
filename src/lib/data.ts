import { get } from "http";
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
export const CompanyPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic features for company",
    features: {
      createJob: { value: "5 Job Posting", available: true },
      getAIFeatures: { value: "Not Available", available: false },
      generateJobEmbeddings: { value: "Not Available", available: false },
      customizeJobEmbeddings: { value: "Not Available", available: false },
      getResumeSummarization: { value: "Not Available", available: false },
    },
    popular: false,
    buttonText: "Current Plan",
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Advanced features for company to manage job postings",
    features: {
      createJob: { value: "10 Job Posting", available: true },
      getAIFeatures: { value: "Available", available: true },
      generateJobEmbeddings: { value: "Available", available: true },
      customizeJobEmbeddings: { value: "Not Available", available: false },
      getResumeSummarization: { value: "Not Available", available: false },
    },
    popular: false,
    buttonText: "Upgrade to Pro",
  },
  {
    name: "Elite",
    price: "$19.99",
    description:
      "Premium features for company to manage job postings and get best hiring solutions",
    features: {
      createJob: { value: "Unlimited Job Posting", available: true },
      getAIFeatures: { value: "Available", available: true },
      generateJobEmbeddings: { value: "Available", available: true },
      customizeJobEmbeddings: { value: "Available", available: true },
      getResumeSummarization: { value: "Available", available: true },
    },
    popular: true,
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
export const CompanyProFeatures = [
  {
    name: "Create Job",
    value: "5 Job",
    avaliable: true,
  },
  {
    name: "Get AI Features",
    value: "Avaliable",
    avaliable: true,
  },
  {
    name: "Get Job Embeddings",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Get Resume Summarization",
    value: "Not Available",
    avaliable: false,
  },
  {
    name: "Customize Job Embeddings",
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
export const CompanyEliteFeatures = [
  {
    name: "Create Job",
    value: "Unlimited",
    avaliable: true,
  },
  {
    name: "Get AI Features",
    value: "Avaliable",
    avaliable: true,
  },
  {
    name: "Get Job Embeddings",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Get Resume Summarization",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Customize Job Embeddings",
    value: "Available",
    avaliable: true,
  },
];

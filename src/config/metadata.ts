import { Metadata } from "next";

export const METADATA_CONFIG: Metadata = {
  title: {
    template: "%s | JobVerse",
    default: "JobVerse - Find, Apply & Succeed.",
  },
  authors: [{ name: "Nilak Pathak" }],
  creator: "Nilak Pathak",
  publisher: "nilak14",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  description:
    "JobVerse is a platform that connects job seekers with employers. JobVerse provides a platform for job seekers to find jobs and for employers to find the right candidates.",
  openGraph: {
    type: "website",
    siteName: "JobVerse - Find, Apply & Succeed.",
    title: "JobVerse - Find, Apply & Succeed.",
    description:
      "JobVerse is a platform that connects job seekers with employers. JobVerse provides a platform for job seekers to find jobs and for employers to find the right candidates.",
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "JobVerse",
    "Job",
    "Job Portal",
    "Job Site",
    "Job Search",
    "Jobs In Nepal",
    "Nepali Job Portal",
    "Employer",
    "Job Seeker",
    "Job Search",
    "Job Application",
    "Job Posting",
    "Job Listing",
    "Job Board",
    "Job Portal",
    "Job Site",
    "Job Website",
    "Job Platform",
    "Job Marketplace",
    "Job Verse",
  ],
};

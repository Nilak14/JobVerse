export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Temporary"
  | "Internship"
  | "Volunteer";

export const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Volunteer",
];
export type WorkMode = "Remote" | "On-site" | "Hybrid";
export const workMode: WorkMode[] = ["Remote", "On-site", "Hybrid"];

export type SalaryType = "Range" | "Starting" | "Maximum" | "Exact";
export const SalaryType: SalaryType[] = [
  "Range",
  "Starting",
  "Maximum",
  "Exact",
];

export type SalaryRate = "Hour" | "Day" | "Week" | "Month" | "Year";
export const SalaryRate: SalaryRate[] = [
  "Hour",
  "Day",
  "Week",
  "Month",
  "Year",
];

export const JobBenefits = [
  "Health insurance",
  "Dental insurance",
  "Vision insurance",
  "Paid Leave",
  "Retirement plan",
  "Parental leave",
  "Flexible schedule",
  "Employee Discount",
  "Referral Program",
];

export const EducationLevel = [
  "Basic",
  "High School",
  "Diploma",
  "Associate",
  "Bachelor",
  "Master",
  "Doctorate",
];
export const PreferredGender = ["None", "Male", "Female", "Other"];

export const LicenseRequired = ["None", "Two Wheeler", "Four Wheeler", "Both"];
export const VehicleRequired = ["None", "Two Wheeler", "Four Wheeler", "Both"];

export const publicRoutes = ["/"];

export const authRoutes = [
  "/login",
  "/register/company",
  "/register/job_seeker",
  "/error",
  "/verify-email",
  "/password-reset",
];

export const apiAuthPrefix = "/api/auth";
export const companyRoutePrefix = "/company";
export const jobSeekerRoutePrefix = "/job-seeker";
export const adminRoutePrefix = "/admin";

export const publicApiRoute = ["/api/uploadthing", "/api/clear-uploads"];

export const DEFAULT_LOGIN_REDIRECT_JOB_SEEKER = "/job-seeker/home";
export const DEFAULT_LOGIN_REDIRECT_COMPANY = "/company/home";
export const DEFAULT_LOGIN_REDIRECT_ADMIN = "/admin/dashboard";
export const DEFAULT_LOGIN_REDIRECT = "/admin/dashboard";

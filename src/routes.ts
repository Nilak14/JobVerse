export const publicRoutes = ["/"];

export const authRoutes = [
  "/login",
  "/register/employer",
  "/register/job_seeker",
  "/error",
  "/verify-email",
  "/password-reset",
  "/forget-password",
];

export const apiAuthPrefix = "/api/auth";
export const employerRoutePrefix = "/employer";
export const jobSeekerRoutePrefix = "/job-seeker";
export const adminRoutePrefix = "/admin";

export const publicApiRoute = [
  "/api/uploadthing",
  "/api/clear-uploads",
  "/api/stripe-webhook",
];
export const publicContentRoute = ["/job/description", "/resume/preview"];
export const publicSEORoute = ["/sitemap.xml", "/robots.txt", "/skills.json"];

export const DEFAULT_LOGIN_REDIRECT_JOB_SEEKER = "/job-seeker/dashboard";
export const DEFAULT_LOGIN_REDIRECT_EMPLOYER = "/employer/dashboard";
export const DEFAULT_LOGIN_REDIRECT_ADMIN = "/admin/dashboard";

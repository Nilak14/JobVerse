import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  employerRoutePrefix,
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_EMPLOYER,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
  jobSeekerRoutePrefix,
  publicRoutes,
  publicSEORoute,
  publicContentRoute,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicSEORoute = publicSEORoute.includes(nextUrl.pathname);
  const isPublicContentRoute = publicContentRoute.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isEmployerRoute = nextUrl.pathname.startsWith(employerRoutePrefix);
  const isJobSeekerRoute = nextUrl.pathname.startsWith(jobSeekerRoutePrefix);
  const isOnboardingRoute = nextUrl.pathname.startsWith("/onboarding");
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);
  const redirectRoute = nextUrl.pathname === "/redirect";

  if (isPublicSEORoute) {
    return;
  }
  if (isApiAuthRoute) {
    return;
  }

  if (nextUrl.pathname.startsWith("/api")) {
    return;
  }
  if (isPublicContentRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/redirect", nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL("/redirect", nextUrl));
  }
  if (isLoggedIn) {
    if (redirectRoute || nextUrl.pathname === "/choose" || isOnboardingRoute) {
      return;
    }
    if (req.auth?.user?.type) {
      if (req.auth?.user.type === "JOB_SEEKER" && !isJobSeekerRoute) {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER, nextUrl)
        );
      } else if (req.auth?.user.type === "EMPLOYER" && !isEmployerRoute) {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_EMPLOYER, nextUrl)
        );
      } else if (req.auth?.user.type === "ADMIN" && !isAdminRoute) {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl)
        );
      }
    } else {
      return Response.redirect(new URL("/redirect", nextUrl));
    }
  }
});
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

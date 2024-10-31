import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  companyRoutePrefix,
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_COMPANY,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
  jobSeekerRoutePrefix,
  publicApiRoute,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicApiRoute = publicApiRoute.includes(nextUrl.pathname);
  const isCompanyRoute = nextUrl.pathname.startsWith(companyRoutePrefix);
  const isJobSeekerRoute = nextUrl.pathname.startsWith(jobSeekerRoutePrefix);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);
  const redirectRoute = nextUrl.pathname === "/redirect";

  if (isApiAuthRoute) {
    return;
  }

  if (isPublicApiRoute) {
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
    if (redirectRoute || nextUrl.pathname === "/choose") {
      return;
    }
    if (req.auth?.user?.type) {
      if (req.auth?.user.type === "JOB_SEEKER" && !isJobSeekerRoute) {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER, nextUrl)
        );
      } else if (req.auth?.user.type === "COMPANY" && !isCompanyRoute) {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_COMPANY, nextUrl)
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

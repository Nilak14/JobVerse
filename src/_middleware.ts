import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_COMPANY,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
  publicApiRoute,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = req.auth;
  const user = session?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isPublicApiRoute = publicApiRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  if (isPublicApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (user?.type === "JOB_SEEKER") {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER, nextUrl)
        );
      } else if (user?.type === "ADMIN") {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl)
        );
      } else if (user?.type === "COMPANY") {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_COMPANY, nextUrl)
        );
      } else {
        return Response.redirect(new URL("/choose", nextUrl));
      }
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  if (isLoggedIn && isPublicRoute) {
    if (user?.type === "JOB_SEEKER") {
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER, nextUrl)
      );
    } else if (user?.type === "ADMIN") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl));
    } else if (user?.type === "COMPANY") {
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_COMPANY, nextUrl)
      );
    } else {
      return Response.redirect(new URL("/choose", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobVerseLogo } from "../../../../public/logo/jobverse";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/data-access/user";
import {
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_COMPANY,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
} from "@/routes";
import prisma from "@/lib/prisma";
import { UserType } from "@prisma/client";
import ChooseCard from "./ChooseCard";
const Choose = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  const user = session.user;
  const dbUser = await getUserByEmail(user.email!);
  if (dbUser?.userType) {
    if (dbUser.userType === "JOB_SEEKER") {
      redirect(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER);
    } else if (dbUser.userType === "COMPANY") {
      redirect(DEFAULT_LOGIN_REDIRECT_COMPANY);
    } else if (dbUser.userType === "ADMIN") {
      redirect(DEFAULT_LOGIN_REDIRECT_ADMIN);
    }
  }
  const updateUserType = async (type: UserType) => {
    "use server";
    await prisma.user.update({
      where: {
        email: dbUser?.email,
      },
      data: {
        userType: type,
      },
    });
    if (type === "JOB_SEEKER") {
      redirect(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER);
    } else if (type === "COMPANY") {
      redirect(DEFAULT_LOGIN_REDIRECT_COMPANY);
    } else if (type === "ADMIN") {
      redirect(DEFAULT_LOGIN_REDIRECT_ADMIN);
    }
  };
  return (
    <main className="flex relative h-dvh flex-col justify-center items-center">
      <div className="flex items-center gap-2 absolute top-10 left-10 ">
        <JobVerseLogo width={"35px"} height={"35px"} fill={"#e9590c"} />
        <span className=" text-3xl tracking-wide text-primary">JobVerse</span>
      </div>
      <Card className="max-w-[550px]  sm:w-[550px] mx-auto">
        <CardHeader>
          <CardTitle>Choose Account Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChooseCard updateUserType={updateUserType} />
        </CardContent>
      </Card>
    </main>
  );
};
export default Choose;

// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import {
//   adminRoutePrefix,
//   apiAuthPrefix,
//   authRoutes,
//   companyRoutePrefix,
//   DEFAULT_LOGIN_REDIRECT_ADMIN,
//   DEFAULT_LOGIN_REDIRECT_COMPANY,
//   DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
//   jobSeekerRoutePrefix,
//   publicApiRoute,
//   publicRoutes,
// } from "./routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   const isPublicApiRoute = publicApiRoute.includes(nextUrl.pathname);
//   const isCompanyRoute = nextUrl.pathname.startsWith(companyRoutePrefix);
//   const isJobSeekerRoute = nextUrl.pathname.startsWith(jobSeekerRoutePrefix);
//   const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);

//   if (isApiAuthRoute) {
//     return;
//   }

//   if (isPublicApiRoute) {
//     return;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL("/redirect", nextUrl));
//     }
//     return;
//   }
//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/login", nextUrl));
//   }
//   if (isLoggedIn && isPublicRoute) {
//     return Response.redirect(new URL("/redirect", nextUrl));
//   }
//   if (isLoggedIn) {
//     if (req.auth?.user.type === "JOB_SEEKER" && !isJobSeekerRoute) {
//       return Response.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER, nextUrl)
//       );
//     } else if (req.auth?.user.type === "COMPANY" && !isCompanyRoute) {
//       return Response.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT_COMPANY, nextUrl)
//       );
//     } else if (req.auth?.user.type === "ADMIN" && !isAdminRoute) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl));
//     }
//   }
// });
// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobVerseLogo } from "../../../../public/logo/jobverse";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/data-access/user";
import {
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_EMPLOYER,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
} from "@/routes";
import prisma from "@/lib/prisma";
import { UserType } from "@prisma/client";
import ChooseCard from "./ChooseCard";
const Choose = async () => {
  const session = await auth();
  const user = session?.user;

  const dbUser = await getUserByEmail(user?.email!);

  if (dbUser?.userType) {
    if (dbUser.userType === "JOB_SEEKER") {
      redirect(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER);
    } else if (dbUser.userType === "EMPLOYER") {
      redirect(DEFAULT_LOGIN_REDIRECT_EMPLOYER);
    } else if (dbUser.userType === "ADMIN") {
      redirect(DEFAULT_LOGIN_REDIRECT_ADMIN);
    }
  }
  const updateUserType = async (type: UserType) => {
    "use server";
    const updatedUser = await prisma.user.update({
      where: {
        email: dbUser?.email,
      },
      data: {
        userType: type,
      },
    });
    if (type === "JOB_SEEKER") {
      await prisma.jOB_SEEKER.create({
        data: {
          userId: updatedUser.id,
        },
      });
      redirect(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER);
    } else if (type === "EMPLOYER") {
      await prisma.employer.create({
        data: {
          userId: updatedUser.id,
        },
      });
      redirect(DEFAULT_LOGIN_REDIRECT_EMPLOYER);
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

import { auth } from "@/auth";
import Ripple from "@/components/ui/ripple";
import { getUserByEmail } from "@/data-access/user";
import prisma from "@/lib/prisma";
import { UserType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
const SetUp = async ({
  searchParams,
}: {
  searchParams: Promise<{ type: UserType }>;
}) => {
  const { type } = await searchParams;
  if (type !== "JOB_SEEKER" && type !== "COMPANY") {
    redirect("/");
  }
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  const user = await getUserByEmail(session.user.email!);
  if (!user || user.userType) {
    redirect("/");
  }
  if (!user.userType) {
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        userType: type,
      },
    });
    redirect("/");
  } else {
    redirect("/");
  }

  return (
    <main className="flex items-center justify-center h-dvh gap-4 flex-col relative">
      <Ripple />
      <div className="flex gap-4 items-center">
        <h1 className="text-2xl text-primary animate-pulse">
          Setting Up Your Account
        </h1>
        <span>
          <Loader2 className="animate-spin  size-9" />
        </span>
      </div>
      <p className="text-muted-foreground">Please Wait a Moment ....</p>
    </main>
  );
};
export default SetUp;

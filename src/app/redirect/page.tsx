import { auth } from "@/lib/auth";
import {
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_EMPLOYER,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
} from "@/routes";
import { redirect } from "next/navigation";

const RedirectPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }
  switch (user.type) {
    case "JOB_SEEKER":
      redirect(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER);
    case "EMPLOYER":
      redirect(DEFAULT_LOGIN_REDIRECT_EMPLOYER);
    case "ADMIN":
      redirect(DEFAULT_LOGIN_REDIRECT_ADMIN);
    default:
      redirect("/choose");
  }
};
export default RedirectPage;
